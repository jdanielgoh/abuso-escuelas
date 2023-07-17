<template>
  <section
    id="texto-horizontal-agresores"
    class="texto-intro-scroll-horizontal"
  >
    <div class="ancho-texto horizontal-scroll_contenedor">
      <canvas class="canvas-vis"></canvas>

      <div
        class="horizontal-scroll_interior contenedor-flex"
        :style="{ transform: `translate(${posicion}%,-55px)` }"
      >
        <div class="horizontal-scroll_item contenedor-flex">
          <div class="ancho-bullet">
            <p class="bullet">
              <span class="izquierda"
                >Se identificaron plenamente a 
              </span>
              <span class="dato-numerico centro" style="color: #5e5e5e"
                >904</span
              >
              <span class="derecha">
                <b style="color: #5e5e5e"> probables agresores*.</b>
              </span>
            </p>
          </div>
        </div>
        <div class="horizontal-scroll_item contenedor-flex">
          <div class="ancho-bullet">
            <p class="bullet">
              <span class="izquierda">De estos,</span>
              <span class="dato-numerico centro" style="color: #21587e"
                >90%</span
              >
              <span class="derecha">
                <b style="color: #21587e"> son hombres</b>
              </span>
            </p>
          </div>
        </div>

        <div class="horizontal-scroll_item contenedor-flex">
          <div class="ancho-bullet">
            <p class="bullet">
              <span class="izquierda"></span>
              <span class="dato-numerico triple centro" style="color: #55adff"
                >718</span
              >
              <span class="derecha"
                ><b style="color: #55adff"> son docentes</b>. Resaltan los profesores interinos: enseñan música, educación física e idiomas

              </span>
              <span class="dato-numerico triple centro" style="color: #882992"
                >85</span
              >
              <span class="centro">
                <b style="color: #882992"> son personal de limpieza</b>
              </span>
              <span class="dato-numerico triple centro" style="color: #c89600"
                >34</span
              >
              <span class="derecha"> <b style="color: #c89600"> son directivos
</b>,
                principalmente en nivel preescolar y primaria.
              </span>
            </p>
            <p>El resto son personal administrativo, becarios, encargados de cooperativa, entre otros.
</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { ref, onMounted, onUnmounted, watch, toRaw } from "vue";
import * as d3 from "d3";
import info_js from "@/assets/datos/info_fiscalias_sep.json";

const posicion = ref(0);
const ancho = ref(0),
  alto = ref(0),
  margenes = ref({ arriba: 50, abajo: 50, izquierda: 50, derecha: 50 });
const canvas = ref(),
  context = ref();
const escalaLineal = ref();
const paso_activo = ref();
const info_fiscalias_sep = ref(info_js);
const detachedContainer = ref(),
  dataContainer = ref(),
  dataBinding = ref();

const ladata_pintable = ref();
onMounted(() => {
  canvas.value = d3.select("#texto-horizontal-agresores canvas.canvas-vis");
  context.value = canvas.value.node().getContext("2d");

  calculandoDimensionesCanvas();
  ligandoDatos();
  calculandoEscalas();
  ladata_pintable.value = d3.range(0, 3815).map((d) => ({
    i: d,
    ang: Math.random() * 2 * Math.PI,
    y: d3.max([ancho.value, alto.value]) * (-5 + 5 * Math.random()),
    x: d3.max([ancho.value, alto.value]) * (-5 + 5 * Math.random()),
    w: d3.max(escalaLineal.value.range()) * 0.01,
    h: d3.max(escalaLineal.value.range()) * 0.01,
    fillStyle: "#CAFF66",
  }));
  configurandoPictos(toRaw(ladata_pintable.value));

  var t = d3.timer((transcurrido) => {
    dibujandoPictos();
    if (transcurrido > 500) {
      t.stop();
    }
  });
  //dibujandoPictos();
  context.value.globalAlpha = 0.8;

  window.addEventListener("scroll", posicionScroleando);
  window.addEventListener("resize", reescalando);
});
onUnmounted(() => {
  window.removeEventListener("scroll", posicionScroleando);
  window.removeEventListener("resize", reescalando);
});
function reescalando() {
  calculandoDimensionesCanvas();
  calculandoEscalas();
  cambioDePasos(paso_activo.value);
}
function calculandoDimensionesCanvas() {
  var dpr = Math.min(2, getPixelRatio(context.value));

  ancho.value =
    document.querySelector("#texto-horizontal-agresores").clientWidth -
    margenes.value.derecha -
    margenes.value.izquierda;
  alto.value =
    document.querySelector(
      "#texto-horizontal-agresores div.horizontal-scroll_item.contenedor-flex"
    ).clientHeight -
    margenes.value.abajo -
    margenes.value.arriba;

  canvas.value.attr(
    "width",
    (ancho.value + margenes.value.izquierda + margenes.value.derecha) * dpr
  );
  canvas.value
    .attr(
      "height",
      (alto.value + margenes.value.arriba + margenes.value.abajo) * dpr
    )
    .style(
      "width",
      ancho.value + margenes.value.izquierda + margenes.value.derecha + "px"
    );
  canvas.value.style(
    "height",
    alto.value + margenes.value.arriba + margenes.value.abajo + "px"
  );

  context.value.scale(dpr, dpr);
  context.value.translate(margenes.value.izquierda, margenes.value.arriba);
}
function ligandoDatos() {
  detachedContainer.value = document.createElement("custom");
  // remplazo de svg
  dataContainer.value = d3.select(detachedContainer.value);
}
function calculandoEscalas() {
  let dimension_minima = d3.min([ancho.value, alto.value]);
  escalaLineal.value = d3
    .scaleLinear()
    .domain([0, 1])
    .range([-0.5 * dimension_minima, 0.5 * dimension_minima]);
}
function configurandoPictos(ladata) {
  //dataContainer.value.selectAll("custom.rectangle").remove();
  let ancho_maximo = d3.max([ancho.value, alto.value]);
  dataBinding.value = dataContainer.value
    .selectAll("custom.rectangle")
    .data(ladata)
    .join(
      (enter) =>
        enter
          .append("custom")
          .classed("rectangle", true)
          .attr(
            "x",
            (d) => d3.max([ancho.value, alto.value]) * (-5 + 10 * Math.random())
          )
          .attr(
            "y",
            (d) => d3.max([ancho.value, alto.value]) * (-5 + 10 * Math.random())
          )
          .attr("w", 0)
          .attr("h", 0)
          .attr("fillStyle", "#5e5e5e"),
      (update) =>
        update
          .attr(
            "x",
            (d) => d3.max([ancho.value, alto.value]) * (-5 + 10 * Math.random())
          )
          .attr(
            "y",
            (d) => d3.max([ancho.value, alto.value]) * (-5 + 10 * Math.random())
          ),
      (exit) => exit.remove()
    )

    .transition()
    .duration(500)
    .attr("x", (d) => ancho.value * 0.5 + d.x)
    .attr("y", (d) => {
      return alto.value * 0.5 + d.y;
    })
    .attr("w", (d) => d.w)
    .attr("h", (d) => d.h)
    .attr("fillStyle", (d) => d.fillStyle);
}
function dibujandoPictos() {
  context.value.save();
  context.value.clearRect(
    -margenes.value.izquierda,
    -margenes.value.arriba,
    margenes.value.derecha + margenes.value.izquierda + ancho.value,
    margenes.value.abajo + margenes.value.arriba + alto.value
  );

  var rectangulos = dataContainer.value.selectAll("custom.rectangle");
  rectangulos.each(function (d) {
    var rectangulo = d3.select(this);
    context.value.moveTo(
      rectangulo.attr("x") + rectangulo.attr("w"),
      rectangulo.attr("y")
    );
    context.value.fillStyle = rectangulo.attr("fillStyle");
    context.value.beginPath();
    context.value.rect(
      rectangulo.attr("x"),
      rectangulo.attr("y"),
      rectangulo.attr("w"),
      rectangulo.attr("h")
    );
    context.value.fill();

    context.value.closePath();
  });
  context.value.restore();
}
function posicionScroleando() {
  let rect = document
    .querySelector("#texto-horizontal-agresores")
    .getBoundingClientRect();
  posicion.value =
    (300 * rect.top) / rect.height > 0
      ? 0
      : (300 * rect.top) / rect.height < -200
      ? -200
      : (300 * rect.top) / rect.height;

  if (-50 < posicion.value) {
    paso_activo.value = 0;
  } else if (-150 < posicion.value && posicion.value <= -50) {
    paso_activo.value = 1;
  } else if (-250 < posicion.value && posicion.value <= -150) {
    paso_activo.value = 2;
  }
}
watch(paso_activo, cambioDePasos);
function cambioDePasos(nv, ov) {
  if (nv == 0) {
    ladata_pintable.value = d3.range(0, 904).map((d, i) => ({
      i: d,
      x: escalaLineal.value((i % 30) / 30),
      y: escalaLineal.value(parseInt(i / 30) / 30),
      w: d3.max(escalaLineal.value.range()) * 0.04,
      h: d3.max(escalaLineal.value.range()) * 0.04,
      fillStyle: "#5e5e5e",
    }));
    configurandoPictos(toRaw(ladata_pintable.value));
    var t = d3.timer((transcurrido) => {
      dibujandoPictos();
      if (transcurrido > 500) {
        t.stop();
      }
    });
  } else if (nv == 1) {
    ladata_pintable.value.forEach((d, i) => {
      d.fillStyle = i < 817 ? "#21587e" : "#5e5e5e";
    });
    configurandoPictos(toRaw(ladata_pintable.value));

    var t = d3.timer((transcurrido) => {
      dibujandoPictos();
      if (transcurrido > 500) {
        t.stop();
      }
    });
  } else if (nv == 2) {
    ladata_pintable.value = d3.range(0, 904).map((d, i) => ({
      i: d,
      x: escalaLineal.value((i % 30) / 30),
      y: escalaLineal.value(parseInt(i / 30) / 30),
      w: d3.max(escalaLineal.value.range()) * 0.04,
      h: d3.max(escalaLineal.value.range()) * 0.04,
      fillStyle:
        i < 718
          ? "#55adff"
          : i < 718 + 34
          ? "#882992"
          : i < 718 + 34 + 85
          ? "#c89600"
          : "#5e5e5e",
    }));
    configurandoPictos(toRaw(ladata_pintable.value));

    var t = d3.timer((transcurrido) => {
      dibujandoPictos();
      if (transcurrido > 500) {
        t.stop();
      }
    });
  }
}

function getPixelRatio(ctx) {
  //From https://www.html5rocks.com/en/tutorials/canvas/hidpi/
  let devicePixelRatio = window.devicePixelRatio || 1;
  let backingStoreRatio =
    ctx.webkitBackingStorePixelRatio ||
    ctx.mozBackingStorePixelRatio ||
    ctx.msBackingStorePixelRatio ||
    ctx.oBackingStorePixelRatio ||
    ctx.backingStorePixelRatio ||
    1;
  let ratio = devicePixelRatio / backingStoreRatio;
  return ratio;
}
</script>

<style lang="scss">
#texto-horizontal-agresores {
  height: 300vh;
}
</style>
