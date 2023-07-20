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
              <span
                >En <strong style="color: #b92d2d"> 21 </strong> de los 32
                estados, los protocolos
                <strong style="color: #b92d2d"
                  >no definen los delitos sexuales acordes al código penal
                  estatal.</strong
                >
              </span>
            </p>
          </div>
        </div>
        <div class="horizontal-scroll_item contenedor-flex">
          <div class="ancho-bullet">
            <p class="bullet">
              <span>
                <strong style="color: #b92d2d"
                  >13 estados no establecen con claridad que las autoridades
                  educativas tienen la obligación de denunciar los delitos
                  sexuales cometidos dentro de las escuelas como lo establece la
                  Ley General de Educación.</strong
                >
                Pese a que la Ley, en su artículo 74, indica que es obligatorio
                “hacer del conocimiento de las autoridades competentes las
                conductas que pueden resultar constitutivas de infracciones o
                delitos cometidos en contra de las niñas, los niños,
                adolescentes”.
              </span>
            </p>
          </div>
        </div>

        <div class="horizontal-scroll_item contenedor-flex">
          <div class="ancho-bullet">
            <p class="bullet">
              <span
                > <strong style="color:#01ab8e">Sólo Tabasco y Zacatecas establecen investigaciones
                administrativas realizadas por personal especializado en la
                materia</strong>, las cuales están pensadas para evitar que los agresores
                sean cambiados a otros colegios y repliquen las violencias como
                ha quedado asentado en actas de hechos de las secretarías de
                educación en las que se recalca que ciertos maestros tenían
                antecedentes de violencia sexual contra estudiantes en otros
                espacios.
              </span>
            </p>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>
<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";
import * as d3 from "d3";

import datos_geograficos from "@/assets/datos/protocolos.json";

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
    .translate([
      ancho.value * 0.5,
      ancho.value > 768 ? alto.value * 0.5 : alto.value * 0.7,
    ]);

  path.value = d3.geoPath().projection(proyeccion.value);

  poligonos.value
    .attr("d", path.value)
    .style("stroke", "#0f1e3d")
    .style("stroke-width", "1px")
    .style("cursor", "pointer")
    .transition()
    .style("fill", (d) =>
      +d.properties[categoria] == 2
        ? "#01ab8e"
        : +d.properties[categoria] == 1
        ? "#b51e00"
        : "#b51e00"
    )
    .style("fill-opacity", (d) =>{
      if(categoria!="investigacion_administrativa"){
       return (+d.properties[categoria] == 2
        ? ".2"
        : +d.properties[categoria] == 1
        ? "1"
        : "1")
    }
    else{
      return (+d.properties[categoria] == 2
        ? "1"
        : +d.properties[categoria] == 1
        ? ".2"
        : ".2")
    }}
    );
}

function posicionScroleando() {
  let rect = document
    .querySelector("#texto-horizontal-protocolos")
    .getBoundingClientRect();
  posicion.value =
    (300 * rect.top) / rect.height > 0
      ? 0
      : (300 * rect.top) / rect.height < -200
      ? -200
      : (300 * rect.top) / rect.height;

  if (-50 < posicion.value) {
    catego.value = "define_conductas";
  } else if (-150 < posicion.value && posicion.value <= -50) {
    catego.value = "notificacion_penales";
  } else if (-250 < posicion.value && posicion.value <= -150) {
    catego.value = "investigacion_administrativa";
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
  height: 600vh;
  .horizontal-scroll_item.contenedor-flex {
    .ancho-bullet {
      margin: 50px auto auto auto;
    }
  }
}
</style>
