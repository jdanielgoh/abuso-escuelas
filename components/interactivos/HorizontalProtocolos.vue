<template>
  <section
    id="texto-horizontal-protocolos"
    class="texto-intro-scroll-horizontal"
  >
    <div class="ancho-texto horizontal-scroll_contenedor" :id="id_contenedor">
      <svg
        id="svg-mapa"
        :width="ancho"
        :height="alto"
        class="svg-viz-horizontal"
      >
        <g class="mapa"></g>
      </svg>
      <div
        class="horizontal-scroll_interior contenedor-flex"
        :style="{ transform: `translate(${posicion}%,0)` }"
      >
        <div class="horizontal-scroll_item contenedor-flex">
          <div class="ancho-bullet">
            <p class="bullet">
              <span class="dato-numerico centro" style="color:#b92d2d">17</span>
              <span class="centro"> <b style="color:#b92d2d">estados</b>  no definen conductas específicas de violencia sexual conforme al marco normativo (acoso sexual, abuso sexual, violación equiparada, hostigamiento sexual). </span>
            </p>
          </div>
        </div>
        <div class="horizontal-scroll_item contenedor-flex">
          <div class="ancho-bullet">
            <p class="bullet">
              <span class="dato-numerico centro" style="color:#b92d2d">7</span>
              <span class="centro"> <b style="color:#b92d2d">estados</b>  no especifican que el protocolo sea aplicable a escuelas privadas. </span>
            </p>
          </div>
        </div>

        <div class="horizontal-scroll_item contenedor-flex">
          <div class="ancho-bullet">
            <p class="bullet">
              <span class="dato-numerico centro" style="color:#b92d2d">11</span>
              <span class="centro"> <b style="color:#b92d2d">estados</b>  no establecen como un paso de la atención, la obligación de notificar de manera inmediata a autoridades penales, una vez que se conoce del caso.</span>
            </p>
          </div>
        </div>
        <div class="horizontal-scroll_item contenedor-flex">
          <div class="ancho-bullet">
            <p class="bullet">
              <span class="dato-numerico centro" style="color:#b92d2d">8</span>
              <span class="centro"> <b style="color:#b92d2d">estados</b>  no establecen como pauta de actuación la obligación de  registrar en forma textual lo que el niño o niña señala. (Medida de no revictimización y resguardo de evidencia)</span>
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

import datos_geograficos from "@/assets/datos/protocolos.json";

let diccionario = {
  "Define conductas específicas de violencia sexual conforme al marco normativo (acoso sexual, abuso sexual, violación equiparada, hostigamiento sexual). ":
    "define_conductas",
  "El protocolo es aplicable a escuelas públicas o privadas (Sí: dice explícitamente que es aplicable a escuelas privadas también; No: dice que solo es aplicable a públicas o no señala nada al respecto).":
    "escuelas_privadas",
  "Establece como un paso de la atención, la obligación de notificar de manera inmediata a autoridades penales, una vez que se conoce del caso. ":
    "notificacion_penales",
  "Establece como pauta de actuación la obligación de  registrar en forma textual lo que el niño o niña señala. (Medida de no revictimización y resguardo de evidencia)":
    "registro_textual",
};


const posicion = ref(0);
const ancho = ref(0),
  alto = ref(0),
  margenes = ref({ arriba: 0, abajo: 0, izquierda: 0, derecha: 0 });
const svg = ref(),
  grupo_poligonos = ref(),
  poligonos = ref();
const geodata = ref();
const paso_activo = ref();
const id_contenedor = ref("svg-mapa-contenedor");
const proyeccion = ref(),
  path = ref(),
  catego = ref("define_conductas");
onMounted(() => {
  svg.value = d3.select("#" + id_contenedor.value).select("svg");
  grupo_poligonos.value = svg.value.select("g.mapa");
  calculandoDimensionesSvg();
    geodata.value = datos_geograficos;
    creaMapa();
    visualizarMapa(catego.value);
  window.addEventListener("scroll", posicionScroleando);
  window.addEventListener("resize", reescalando);
});
onUnmounted(() => {
  window.removeEventListener("scroll", posicionScroleando);
  window.removeEventListener("resize", reescalando);
});
function reescalando() {
  calculandoDimensionesSvg();
  visualizarMapa(catego.value);
  cambioDePasos(paso_activo.value);
}
function calculandoDimensionesSvg() {
  ancho.value =
    document.querySelector("#texto-horizontal-protocolos").clientWidth -
    margenes.value.derecha -
    margenes.value.izquierda;
  alto.value =
    document.querySelector(
      "#texto-horizontal-protocolos div.horizontal-scroll_item.contenedor-flex"
    ).clientHeight -
    margenes.value.abajo -
    margenes.value.arriba;
}
function creaMapa() {
  poligonos.value = grupo_poligonos.value
    .selectAll(".path-poligono")
    .data(geodata.value.features)
    .enter()
    .append("path");
}
function visualizarMapa(categoria) {
  proyeccion.value = d3
    .geoMercator()
    .scale(1.75 * d3.min([alto.value, ancho.value]))
    .center([-102, 25])
    .translate([ancho.value * 0.5, alto.value * 0.5]);

  path.value = d3.geoPath().projection(proyeccion.value);
  console.log(categoria, poligonos.value.filter(d=>      d.properties[categoria] != "Sí" 
)._groups[0].length)
  poligonos.value
    .attr("d", path.value)
    .style("stroke", "#0f1e3d")
    .style("stroke-width", "1px")
    .style("cursor", "pointer")
    .transition()
    .style("fill", (d) =>
      d.properties[categoria] != "Sí" ? "#b92d2d" : "#e0e0e0"
    );
}

function posicionScroleando() {
  let rect = document
    .querySelector("#texto-horizontal-protocolos")
    .getBoundingClientRect();
  posicion.value =
    (400 * rect.top) / rect.height > 0
      ? 0
      : (400 * rect.top) / rect.height < -300
      ? -300
      : (400 * rect.top) / rect.height;

  if (-50 < posicion.value) {
    catego.value = "define_conductas";
  } else if (-150 < posicion.value && posicion.value <= -50) {
    catego.value = "escuelas_privadas";
  } else if (-250 < posicion.value && posicion.value <= -150) {
    catego.value = "notificacion_penales";
  } else if (-350 < posicion.value && posicion.value <= -250) {
    catego.value = "registro_textual";
  }
}
watch(catego, (nv) => visualizarMapa(nv));
function cambioDePasos(nv, ov) {
  if (nv == 0) {
    visualizarMapa(nv);
  } else if (nv == 1) {
    visualizarMapa(nv);
  } else if (nv == 2) {
    visualizarMapa(nv);
  }
}
</script>

<style lang="scss">
#texto-horizontal-protocolos {
  height: 400vh;
}
</style>
