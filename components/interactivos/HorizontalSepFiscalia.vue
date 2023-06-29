<template>
  <section
    id="texto-horizontal-sep-fiscalia"
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
            <p class="bullet" style="color: #5e5e5e">
              <span class="izquierda"
                >En la última década, las Secretarías de Educación han
                registrado</span
              >
              <span class="dato-numerico centro">3,865</span>
              <span class="derecha">
                casos de abuso dentro de las escuelas. En promedio, todos los
                días ocurre una agresión sexual contra niñas, niños y
                adolescentes a manos de personal de los colegios a los que
                asisten.
              </span>
            </p>
          </div>
        </div>
        <div class="horizontal-scroll_item contenedor-flex">
          <div class="ancho-bullet">
            <p class="bullet" style="color: #038f83">
              <span class="izquierda">En el mismo periodo llegaron sólo</span>
              <span class="dato-numerico centro">1,846</span>
              <span class="derecha">
                carpetas de investigación por este delito a los Ministerios
                Públicos. Apenas el 50% de lo que registran las secretarías de
                educación del país.
              </span>
            </p>
          </div>
        </div>
        <div class="horizontal-scroll_item contenedor-flex">
          <div class="ancho-bullet">
            <p class="bullet">
              <span class="izquierda"
                >Mariana Gil, abogada y directora de la Oficina de Defensoría de
                los Derechos de la Infancia, A.C. (ODI), reconoce que la cifra
                negra en estos casos es incalculable. En uno de los casos que la
                organización acompañó legalmente, lograron consolidar</span
              >
              <span class="dato-numerico centro" style="color: #0c8d96"
                >30</span
              >
              <span class="centro">
                deununcias de víctimas, pero en realidad habían
              </span>
              <span class="dato-numerico centro">90</span>
              <span class="centro"> afectadas </span>
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
      (exit) =>
        exit
          .remove()
    )
    .transition()
    .delay((d,i) => i<3815 ? 0 : 500 + 30 *(i%10))
    .duration((d,i) => i<3815 ? 500 : 0)
    .attr("x", (d) => ancho.value * 0.5 + d.rad * Math.cos(d.ang))
    .attr("y", (d) => alto.value * 0.5 + d.rad * Math.sin(d.ang))
    .attr("r1", (d) => d.r1)
    .attr("r2", (d) => d.r2)
    .attr("fillStyle", (d) => d.fillStyle)
    ;
}
watch(paso_activo, cambioDePasos);
function cambioDePasos(nv, ov) {
  if (nv == 0) {
    ladata_pintable.value = d3.range(0, 3815).map((d, i) => ({
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
      r1: d3.max(escalaRad.value.range()) * 0.01,
      r2: d3.max(escalaRad.value.range()) * 0.01,
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
    ladata_pintable.value = d3.range(0, 38015).map((d, i) => ({
      i: d,
      ang: i < 1846
          ? Math.random() * 0.48 * 2 * Math.PI
          :  i< 3815 ? (0.48 + Math.random() * 0.52) * 2 * Math.PI : Math.random() * 2 * Math.PI,
      rad: i < 3815 ? ladata_pintable.value[i].rad * 0.05 : escalaRad.value(Math.pow(Math.random(), 0.5)),
      r1: d3.max(escalaRad.value.range()) * 0.005,
      r2: d3.max(escalaRad.value.range()) * 0.005,
      fillStyle: i < 1846 ? "#038f83" : i< 3815 ? "#5e5e5e" : "#b0b0b0",
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
  height: 300vh;
  table {
    font-size: 12px;
    margin: auto;
    td.info-entregada-no {
      color: red;
    }
    td.info-entregada-si {
      color: green;
    }
  }
}
</style>
