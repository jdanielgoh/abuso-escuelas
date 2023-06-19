<template>
  <section id="texto-intro-scroll-horizontal-protocolos">
    <div class="ancho-texto horizontal-scroll_contenedor" :id="id_contenedor">
      <svg id="svg-mapa" :width="ancho" :height="alto">
          <g class="mapa" ></g>
        </svg>
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

const posicion = ref(0);
const ancho = ref(0),
  alto = ref(0),
  margenes = ref({ arriba: 0, abajo: 0, izquierda: 0, derecha: 0 });
const svg = ref(),grupo_poligonos=ref(), poligonos=ref();
const geodata = ref()
const paso_activo = ref();
const id_contenedor = ref('svg-mapa-contenedor')
const proyeccion =ref(), path =ref(), catego = ref("define_conductas")
onMounted(() => {
  svg.value = d3.select("#" + id_contenedor.value).select("svg");
  grupo_poligonos.value = svg.value.select("g.mapa");
  calculandoDimensionesSvg();
  d3.json("/datos/protocolos.geojson").then((datos_geograficos) => {
    console.log(datos_geograficos)
    geodata.value = datos_geograficos
    creaMapa()
    visualizarMapa(catego.value)
  })
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
    document.querySelector("#texto-intro-scroll-horizontal-protocolos").clientWidth -
    margenes.value.derecha -
    margenes.value.izquierda;
  alto.value =
    document.querySelector(
      "#texto-intro-scroll-horizontal-protocolos div.horizontal-scroll_item.contenedor-flex"
    ).clientHeight -
    margenes.value.abajo -
    margenes.value.arriba;

}
function creaMapa(){
  poligonos.value = grupo_poligonos.value
        .selectAll(".path-poligono")
        .data(geodata.value.features)
        .enter()
        .append("path")
        
}
function visualizarMapa(categoria) {
  proyeccion.value = d3
        .geoMercator()
        .scale(1.75 * d3.min([alto.value, ancho.value]))
        .center([-102, 25])
        .translate([ancho.value * 0.5, alto.value * 0.5]);

  path.value = d3.geoPath().projection(proyeccion.value);
  poligonos.value
        .attr("d", path.value)
        .style("stroke", "#0f1e3d")
        .style("stroke-width", "1px")
        .style("cursor", "pointer")
        .transition()
        .style("fill", d=>d.properties[categoria]!= "Sí" ? "#ff5b5b" : "#e0e0e0")
;
  }

function posicionScroleando() {
  let rect = document
    .querySelector("#texto-intro-scroll-horizontal-protocolos")
    .getBoundingClientRect();
  posicion.value =
    (300 * rect.top) / rect.height > 0
      ? 0
      : (300 * rect.top) / rect.height < -200
      ? -200
      : (300 * rect.top) / rect.height;

  if (-50 < posicion.value) {
    catego.value = "define_conductas"
  } else if (-150 < posicion.value && posicion.value <= -50) {
    catego.value = "escuelas_privadas"
  } else if (-250 < posicion.value && posicion.value <= -150) {
    catego.value = "notificacion_penales"
  }
}
watch(catego, (nv)=>visualizarMapa(nv));
function cambioDePasos(nv, ov) {
  if (nv == 0) {
    visualizarMapa(nv)

  } else if (nv == 1) {
    visualizarMapa(nv)

  } else if (nv == 2) {
    visualizarMapa(nv)


  }
}

</script>

<style lang="scss">
#texto-intro-scroll-horizontal-protocolos {
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
    svg {
      //background: rgb(206, 206, 206);
      position: absolute;
      top: 0;
    }
  }
}
</style>
