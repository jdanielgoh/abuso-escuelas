<template>
  <section id="texto-intro-scroll-horizontal-2">
    <div class="ancho-texto horizontal-scroll_contenedor">
      <canvas class="canvas-vis"></canvas>

      <div
        class="horizontal-scroll_interior contenedor-flex"
        :style="{ transform: `translate(${posicion}%,0)` }"
      >
        <div class="horizontal-scroll_item contenedor-flex">
          <div class="ancho-texto">
            <p>
              Los registros de 18 autoridades educativas del país permiten
              identificar el perfil de, por lo menos,
              <strong style="background: #ff5555"
                >904 probables agresores</strong
              >
              que estuvieron involucrados en 1,763 quejas.
            </p>
          </div>
        </div>
        <div class="horizontal-scroll_item contenedor-flex">
          <div class="ancho-texto">
            <p>
              De estos, nueve de cada diez,
              <strong style="background: #4cdbc1"
                >es decir 810, son hombres</strong
              >
              que cumplían alguna función dentro de los centros escolares y, en
              promedio, rondaban los 47 años de edad.
            </p>
          </div>
        </div>

        <div class="horizontal-scroll_item contenedor-flex">
          <div class="ancho-texto">
            <p>
              Los puestos que ocupaban muestran un patrón claro: jerarquía,
              impunidad y falta de supervisión:
              <strong style="background: #55adff"
                >718 de estos probables agresores (79%) eran docentes</strong
              >, resaltan aquellos en donde se especifica que eran maestros de
              música o educación física, pero interinos. Hay otros casos en los
              que su posición los blindó para cometer estos delitos, se tiene
              documentados a
              <strong style="background: #882992">34 directivos </strong>que
              fueron acusados por sus alumnos.
            </p>
            <p>
              La omisión de las autoridades educativas es clara en la
              estadística, su falta de vigilancia al personal que está en las
              escuelas, junto a los procesos laxos de contratación, se refleja
              al tener plenamente identificados a
              <strong style="background: #c89600">85 intendentes (9.4%)</strong>
              que fueron señalados como los victimarios, principalmente en nivel
              preescolar y primaria.
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
  margenes = ref({ arriba: 20, abajo: 20, izquierda: 20, derecha: 20 });
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
  canvas.value = d3.select(
    "#texto-intro-scroll-horizontal-2 canvas.canvas-vis"
  );
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
    document.querySelector("#texto-intro-scroll-horizontal-2").clientWidth -
    margenes.value.derecha -
    margenes.value.izquierda;
  alto.value =
    document.querySelector(
      "#texto-intro-scroll-horizontal-2 div.horizontal-scroll_item.contenedor-flex"
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
          .attr("fillStyle", "#ff5555"),
      (update) =>
        update.attr(
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
    .querySelector("#texto-intro-scroll-horizontal-2")
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
      fillStyle: "#ff5555",
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
      d.fillStyle = i < 817 ? "#4cdbc1" : "#ff5555";
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
          : "#ff5555",
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
#texto-intro-scroll-horizontal-2 {
  background-color: transparent;

  transition: background-color 0.75s ease;

  &.seccion-activa{
    background-color: $color-fondo-claro;

  }  
  color: $color-texto-oscuro;
  width: 100vw;
  height: 300vh;
  position: relative;
  .horizontal-scroll_contenedor {
    width: 100vw;
    position: sticky;
    overflow: hidden;
    top: 0;
    .horizontal-scroll_interior {
      padding-top: 50px;
      .horizontal-scroll_item {
        width: 100%;
        height: 100vh;
        flex: 0 0 auto;
        .ancho-texto {
          border-radius: $radio-borde;
          background: #e0e0e0b3;          max-width: 600px;
          @media (max-width: $pantalla-movil) {
            max-width: 80vw;
          }
          padding: 0 16px;


        }
      }
    }
    canvas {
      //background: rgb(206, 206, 206);
      position: absolute;
      top: 0;
    }
  }
}
</style>
