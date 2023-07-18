<template>
  <section
    id="texto-horizontal-casos-particulares"
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
                >6.1-El caso de las agresiones cometidas por el conserje del colegio Andrés Oscoy (2011) nos da un panorama</span
              >
              
            </p>
            <ul class="bullet">
              <li style="color: #5e5e5e">Hubo 90 víctimas de preescolar</li>
              <li style="color: #038f83">Sólo 30 denunciaron penalmente</li>
            </ul>
          </div>
        </div>
        <div class="horizontal-scroll_item contenedor-flex">
          <div class="ancho-bullet">
            <p class="bullet" style="color: #5e5e5e">
              <span class="izquierda">En el caso de las agresiones del docente del Jardín de Niños Marcelino Champagnat (2018)</span>

            </p>
            <ul class="bullet">
              <li style="color: #5e5e5e">Hubo 51 víctimas</li>
              <li style="color: #038f83">Sólo 17 denunciaron penalmente</li>
            </ul>
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
const escalaRad = ref();
const paso_activo = ref();
const info_fiscalias_sep = ref(info_js);
const detachedContainer = ref(),
  dataContainer = ref(),
  dataBinding = ref();

const ladata_pintable = ref();
onMounted(() => {
  canvas.value = d3.select("#texto-horizontal-casos-particulares canvas.canvas-vis");
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
    document.querySelector("#texto-horizontal-casos-particulares").clientWidth -
    margenes.value.derecha -
    margenes.value.izquierda;
  alto.value =
    document.querySelector(
      "#texto-horizontal-casos-particulares div.horizontal-scroll_item.contenedor-flex"
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
          .attr(
            "x",
            (d) =>
              ancho.value * 0.5 +
              escalaRad.value(Math.pow(Math.random(), 0.5)) +
              d3.max([ancho.value, alto.value]) * Math.cos(d.ang)
          )
          .attr(
            "y",
            (d) =>
              alto.value * 0.5 +
              escalaRad.value(Math.pow(Math.random(), 0.5)) +
              d3.max([ancho.value, alto.value]) * Math.sin(d.ang)
          )
          .attr("r1", 0)
          .attr("r2", 0)
          .attr("fillStyle", "#5e5e5e"),
      (update) => update,
      (exit) =>
        exit
          .transition()
          .duration(500)
          .attr(
            "x",
            (d) =>
              ancho.value * 0.5 +
              escalaRad.value(Math.pow(Math.random(), 0.5)) +
              d3.max([ancho.value, alto.value]) * Math.cos(d.ang)
          )
          .attr(
            "y",
            (d) =>
              alto.value * 0.5 +
              escalaRad.value(Math.pow(Math.random(), 0.5)) +
              d3.max([ancho.value, alto.value]) * Math.sin(d.ang)
          )
          .remove()
    )
    .transition()
    .duration(500)
    .attr("x", (d) => ancho.value * 0.5 + d.rad * Math.cos(d.ang))
    .attr("y", (d) => alto.value * 0.5 + d.rad * Math.sin(d.ang))
    .attr("r1", (d) => d.r1)
    .attr("r2", (d) => d.r2)
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
    .querySelector("#texto-horizontal-casos-particulares")
    .getBoundingClientRect();
  posicion.value =
    (200 * rect.top) / rect.height > 0
      ? 0
      : (200 * rect.top) / rect.height < -100
      ? -100
      : (200 * rect.top) / rect.height;

  if (-50 < posicion.value) {
    paso_activo.value = 0;
  } else if (-150 < posicion.value && posicion.value <= -50) {
    paso_activo.value = 1;
  } 
}
watch(paso_activo, cambioDePasos);
function cambioDePasos(nv, ov) {
   if (nv == 0) {
    ladata_pintable.value = d3.range(0, 90).map((d, i) => ({
      i: d,
      ang: (2 * Math.PI * i) / 90,
      //rad: escalaRad.value(Math.pow(Math.random(), 0.5)),
      rad: escalaRad.value.range()[1],

      r1: (escalaRad.value.range()[1] * Math.PI) / 90,
      r2: (escalaRad.value.range()[1] * Math.PI) / 90,
      fillStyle: i < 30 ? "#038f83" : "#5e5e5e",
    }));
    configurandoPictos(toRaw(ladata_pintable.value));

    var t = d3.timer((transcurrido) => {
      dibujandoPictos();
      if (transcurrido > 500) {
        t.stop();
      }
    });
  } else if (nv == 1) {
    ladata_pintable.value = d3.range(0, 51).map((d, i) => ({
      i: d,
      ang: (2 * Math.PI * i) / 51,
      rad: escalaRad.value.range()[1],

      //rad: escalaRad.value(Math.pow(Math.random(), 0.5)),
      r1: (escalaRad.value.range()[1] * Math.PI) / 51,
      r2: (escalaRad.value.range()[1] * Math.PI) / 51,
      fillStyle: i < 17 ? "#038f83" : "#5e5e5e",
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
#texto-horizontal-casos-particulares {
  height: 200vh;
}
</style>