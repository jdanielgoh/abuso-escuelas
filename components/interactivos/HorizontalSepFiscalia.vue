<template>
  <section
    id="texto-horizontal-sep-fiscalia"
    class="texto-intro-scroll-horizontal"
  >
    <div class="ancho-texto horizontal-scroll_contenedor">
      <img
        src="~/assets/imgs/inicio/puntos.png"
        alt=""
        class="imagen-precanvas"
        :style="{
          width: ancho + margenes.izquierda + margenes.derecha + 'px',
          height: alto + margenes.arriba + margenes.abajo + 'px',
          opacity: paso_activo == 2 ? 0.2 : 0,
          transform: paso_activo == 2 ? 'scale(1)' : 'scale(2)',
        }"
      />
      <canvas class="canvas-vis"></canvas>

      <div
        class="horizontal-scroll_interior contenedor-flex"
        :style="{ transform: `translate(${posicion}%,-55px)` }"
      >
        <div class="horizontal-scroll_item contenedor-flex">
          <div class="ancho-bullet">
            <p class="bullet">
              Los casos como el de J. son más frecuentes de lo que se reconoce
              oficialmente.
            </p>
            <p class="bullet">
              <span class="izquierda">En la última década se registraron</span>
              <span class="dato-numerico centro" style="color: #5e5e5e"
                >3,534</span
              >
              <span class="derecha"> casos similares. </span>
            </p>
          </div>
        </div>
        <div class="horizontal-scroll_item contenedor-flex">
          <div class="ancho-bullet">
            <p class="bullet">
              Aunque en la Ley General de Educación está establecida la
              responsabilidad del personal de los colegios de denunciar los
              presuntos delitos ante la justicia, esto no siempre se cumple.
            </p>
            <p class="bullet">
              <span class="izquierda">Sólo el</span>
              <span class="dato-numerico centro" style="color: #038f83"
                >52%</span
              >
              <span class="derecha"> de estos casos llegó a la Fiscalía. </span>
            </p>
          </div>
        </div>
        <div class="horizontal-scroll_item contenedor-flex">
          <div class="ancho-bullet">
            <p class="bullet">
              <span class="izquierda"> La cifra negra es inmensa. </span>

              <span class="izquierda"
                >Hay dependencias que no reconocen la violencia sexual en sus
                escuelas, que no registran los casos o que evitan hacerlos
                públicos.
              </span>
            </p>
          </div>
        </div>
        <!--
        <div class="horizontal-scroll_item contenedor-flex">
          <div class="ancho-texto" >
            <p>
              La SEP entregó los datos solicitados via transparencia en 23
              entidades. Mientras que en las Fiscalías de Justicia, solo 17
              estados informaron.
            </p>
            <div class="contenedor-flex">
              <table>
                <tr>
                  <th>Estado</th>
                  <th>Fiscalía</th>
                  <th>SEP</th>
                </tr>
                <tr
                  v-for="info in info_fiscalias_sep.slice(0, 16)"
                  :key="info.entidad"
                >
                  <td>{{ info.entidad }}</td>
                  <td
                    :class="
                      'info-entregada-' + info.info_fiscalia.toLocaleLowerCase()
                    "
                  >
                    {{ info.info_fiscalia }}
                  </td>
                  <td
                    :class="
                      'info-entregada-' + info.info_sep.toLocaleLowerCase()
                    "
                  >
                    {{ info.info_sep }}
                  </td>
                </tr>
              </table>
              <table>
                <tr>
                  <th>Estado</th>
                  <th>Fiscalía</th>
                  <th>SEP</th>
                </tr>
                <tr
                  v-for="info in info_fiscalias_sep.slice(16)"
                  :key="info.entidad"
                >
                  <td>{{ info.entidad }}</td>
                  <td
                    :class="
                      'info-entregada-' + info.info_fiscalia.toLocaleLowerCase()
                    "
                  >
                    {{ info.info_fiscalia }}
                  </td>
                  <td
                    :class="
                      'info-entregada-' + info.info_sep.toLocaleLowerCase()
                    "
                  >
                    {{ info.info_sep }}
                  </td>
                </tr>
              </table>
            </div>
            <p>
              Sin embargo, comisiones de derechos humanos y oficinas de
              protección a la infancia confirmaron que en los estados donde ni
              la SEP ni las Fiscalías dieron información, estos delitos están
              presentes: no hay un solo estado que no tenga registros de
              violencia sexual.
            </p>
          </div>
        </div>
-->
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
const escalaRad = ref();
const paso_activo = ref();
const info_fiscalias_sep = ref(info_js);
const detachedContainer = ref(),
  dataContainer = ref(),
  dataBinding = ref();

const ladata_pintable = ref();
onMounted(() => {
  canvas.value = d3.select("#texto-horizontal-sep-fiscalia canvas.canvas-vis");
  context.value = canvas.value.node().getContext("2d");

  calculandoDimensionesCanvas();
  ligandoDatos();
  calculandoEscalas();
  ladata_pintable.value = d3.range(0, 3815).map((d) => ({
    i: d,
    ang: Math.random() * 2 * Math.PI,
    rad: escalaRad.value(Math.pow(Math.random(), 0.5)),
    r1: d3.max(escalaRad.value.range()) * 0.01,
    r2: d3.max(escalaRad.value.range()) * 0.01,
    fillStyle: "#5e5e5e",
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
    document.querySelector("#texto-horizontal-sep-fiscalia").clientWidth -
    margenes.value.derecha -
    margenes.value.izquierda;
  alto.value =
    document.querySelector(
      "#texto-horizontal-sep-fiscalia div.horizontal-scroll_item.contenedor-flex"
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
  let dimension_minima = 0.5 * d3.min([ancho.value, alto.value]);
  escalaRad.value = d3
    .scaleLinear()
    .domain([0, 1])
    .range([0, dimension_minima]);
}

function dibujandoPictos() {
  context.value.save();
  context.value.clearRect(
    -margenes.value.izquierda,
    -margenes.value.arriba,
    margenes.value.derecha + margenes.value.izquierda + ancho.value,
    margenes.value.abajo + margenes.value.arriba + alto.value
  );

  var elipses = dataContainer.value.selectAll("custom.ellipse");
  elipses.each(function (d) {
    var elipse = d3.select(this);
    context.value.moveTo(
      elipse.attr("x") + elipse.attr("r1"),
      elipse.attr("y")
    );
    context.value.fillStyle = elipse.attr("fillStyle");
    context.value.beginPath();
    context.value.ellipse(
      elipse.attr("x"),
      elipse.attr("y"),
      elipse.attr("r1"),
      elipse.attr("r2"),
      0,
      0,
      2 * Math.PI
    );
    context.value.fill();

    context.value.closePath();
  });
  context.value.restore();
}
function posicionScroleando() {
  let rect = document
    .querySelector("#texto-horizontal-sep-fiscalia")
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
function configurandoPictos(ladata) {
  //dataContainer.value.selectAll("custom.ellipse").remove();
  dataBinding.value = dataContainer.value
    .selectAll("custom.ellipse")
    .data(ladata)
    .join(
      (enter) =>
        enter
          .append("custom")
          .classed("ellipse", true)

          .attr("r1", 0)
          .attr("r2", 0)
          .attr("fillStyle", "#5e5e5e"),
      (update) => update,
      (exit) => exit.remove()
    )
    .transition()
    //.delay((d, i) => (i < 3815 ? 0 : 500 + 30 * (i % 10)))
    .duration(500)
    .attr("x", (d) => ancho.value * 0.5 + d.rad * Math.cos(d.ang))
    .attr("y", (d) => alto.value * 0.5 + d.rad * Math.sin(d.ang))
    .attr("r1", (d) => d.r1)
    .attr("r2", (d) => d.r2)
    .attr("fillStyle", (d) => d.fillStyle);
}
watch(paso_activo, cambioDePasos);
function cambioDePasos(nv, ov) {
  let radio_punto = d3.max(escalaRad.value.range()) * 0.01;
  if (nv == 0) {
    ladata_pintable.value = d3.range(0, 3815).map((d, i) => ({
      i: d,
      ang: Math.random() * 2 * Math.PI,
      rad: escalaRad.value(Math.pow(Math.random(), 0.5)),
      r1: radio_punto,
      r2: radio_punto,
      fillStyle: "#5e5e5e",
    }));
    configurandoPictos(toRaw(ladata_pintable.value));

    var t = d3.timer((transcurrido) => {
      dibujandoPictos();
      if (transcurrido > 1000) {
        t.stop();
      }
    });
  } else if (nv == 1) {
    ladata_pintable.value = d3.range(0, 3815).map((d, i) => ({
      i: d,
      ang:
        i < 1846
          ? Math.random() * 0.48 * 2 * Math.PI
          : (0.48 + Math.random() * 0.52) * 2 * Math.PI,
      rad: escalaRad.value(Math.pow(Math.random(), 0.5)),
      r1: radio_punto,
      r2: radio_punto,
      fillStyle: i < 1846 ? "#038f83" : "#5e5e5e",
    }));
    configurandoPictos(toRaw(ladata_pintable.value));

    var t = d3.timer((transcurrido) => {
      dibujandoPictos();
      if (transcurrido > 500) {
        t.stop();
      }
    });
  } else if (nv == 2) {
    ladata_pintable.value = d3.range(0, 3815).map((d, i) => ({
      i: d,
      ang:
        i < 1846
          ? Math.random() * 0.48 * 2 * Math.PI
          : (0.48 + Math.random() * 0.52) * 2 * Math.PI,
      rad: Math.pow(
        (3 * Math.pow(escalaRad.value(Math.pow(Math.random(), 0.5)), 2)) / 100,
        0.5
      ),
      r1: (radio_punto * 3) / 10,
      r2: (radio_punto * 3) / 10,
      fillStyle: i < 1846 ? "#038f83" : i < 3815 ? "#5e5e5e" : "#b0b0b0",
    }));
    configurandoPictos(toRaw(ladata_pintable.value));

    var t = d3.timer((transcurrido) => {
      dibujandoPictos();
      if (transcurrido > 1000) {
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
#texto-horizontal-sep-fiscalia {
  .imagen-precanvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: 50% 50%;
    transform: scale(2);
    transition: all 0.5s ease-in-out;
  }
  height: 600vh;
}
</style>
