<template>
  <section id="texto-intro-scroll-horizontal">
    <div class="ancho-texto horizontal-scroll_contenedor">
      <svg
        class="svg-vis"
        :width="ancho + margenes.arriba + margenes.abajo"
        :height="alto + margenes.arriba + margenes.abajo"
      >
        <g
          class="grupo-contenedor"
          :transform="`translate(${margenes.izquierda},${margenes.arriba})`"
        ></g>
      </svg>
      <canvas
        class="canvas-vis"

      ></canvas>

      <div
        class="horizontal-scroll_interior contenedor-flex"
        :style="{ transform: `translate(${posicion}%,0)` }"
      >
        <div class="horizontal-scroll_item contenedor-flex">
          <div class="ancho-texto">
            <p>
              México ocupa el primer lugar en abuso sexual infantil, de acuerdo
              con la Organización para la Cooperación y el Desarrollo
              Económico(OCDE).<strong>
                Dentro de las escuelas, las Secretarías de Educación registraron
                3,865 casos en la última década.</strong
              >
              Esto quiere decir que, en promedio, todos los días ocurre una
              agresión sexual contra niñas, niños y adolescentes a manos de
              personal de los colegios a los que asisten.
            </p>
          </div>
        </div>
        <div class="horizontal-scroll_item contenedor-flex">
          <div class="ancho-texto">
            <p>
              Estos datos están muy por encima de los que llegan ante los
              Ministerios Públicos en el país, en donde<strong class="rosa">
                solo existen 1,846 carpetas de investigación por este
                delito</strong
              >. Apenas el 50% de lo que se registra en las secretarías de
              educación del país.
            </p>
          </div>
        </div>

        <div class="horizontal-scroll_item contenedor-flex">
          <div class="ancho-texto">
            <p>
              La cifra es, sin embargo, conservadora. Aunque vía transparencia
              se solicitó a las Secretarías de Educación información sobre
              quejas por abuso sexual infantil dentro de las aulas, sólo 23
              entidades dieron los datos. Lo mismo con las Fiscalías de
              Justicia, sólo 17 informaron.
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
              Los vacíos de información son reflejo de la omisión de las
              autoridades, la falta de atención a la problemática y el nulo
              seguimiento a los casos reportados.
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
import info_js from "@/assets/datos/info_fiscalias_sep.json";

const posicion = ref(0);
const ancho = ref(0),
  alto = ref(0),
  margenes = ref({ arriba: 20, abajo: 20, izquierda: 20, derecha: 20 });
const svg = ref(),
  canvas = ref(),
  context = ref(),
  grupo_contenedor = ref(),
  pictos = ref();
const escalaRad = ref();
const paso_activo = ref();
const info_fiscalias_sep = ref(info_js);
const detachedContainer = ref(),
  dataContainer = ref(),
  dataBinding = ref();
onMounted(() => {
  svg.value = d3.select("#texto-intro-scroll-horizontal svg.svg-vis");
  canvas.value = d3.select("#texto-intro-scroll-horizontal canvas.canvas-vis");
  context.value = canvas.value.node().getContext("2d");
  grupo_contenedor.value = svg.value.select("g.grupo-contenedor");

  calculandoDimensionesSvg();
  ligandoDatos();
  calculandoEscalas();
  creandoPictos();
  configurandoPictos();
  context.value.globalAlpha = .8

  window.addEventListener("scroll", posicionScroleando);
});
onUnmounted(() => {
  window.removeEventListener("scroll", posicionScroleando);
});
function calculandoDimensionesSvg() {
  var dpr = Math.min(2, getPixelRatio(context.value));

  ancho.value =
    document.querySelector("#texto-intro-scroll-horizontal").clientWidth -
    margenes.value.derecha -
    margenes.value.izquierda;
  alto.value =
    document.querySelector(
      "#texto-intro-scroll-horizontal div.horizontal-scroll_item.contenedor-flex"
    ).clientHeight -
    margenes.value.abajo -
    margenes.value.arriba;
    console.log(dpr)

  canvas.value.attr("width",ancho.value + margenes.value.izquierda + margenes.value.derecha)
  canvas.value.attr("height",alto.value + margenes.value.arriba + margenes.value.abajo)  
  
  context.value.scale(dpr, dpr);
  context.value.translate(margenes.value.izquierda, margenes.value.arriba);
}
function ligandoDatos() {
  detachedContainer.value = document.createElement("custom");
  dataContainer.value = d3.select(detachedContainer.value);
}
function calculandoEscalas() {
  let dimension_minima = 0.5 * d3.min([ancho.value, alto.value]);
  escalaRad.value = d3
    .scaleLinear()
    .domain([0, 1])
    .range([0, dimension_minima]);
}
function creandoPictos() {
  let ladata = d3.range(0, 3815).map((d) => ({
    i: d,
    ang: Math.random() * 2 * Math.PI,
    rad: Math.pow(Math.random(), 0.5),
  }));
  pictos.value = grupo_contenedor.value
    .selectAll("pictos")
    .data(ladata)
    .enter()
    .append("circle");

  dataContainer.value.selectAll("custom.ellipse").remove();

  dataBinding.value = dataContainer.value
    .selectAll("custom.ellipse")
    .data(ladata,d=>d)
    .enter()
    .append("custom")
    .classed("ellipse", true)
    .attr(
      "x",
      (d) => ancho.value * 0.5 + escalaRad.value(d.rad) * Math.cos(d.ang)
    )
    .attr(
      "y",
      (d) => alto.value * 0.5 + escalaRad.value(d.rad) * Math.sin(d.ang)
    )
    .attr("r1", d3.max(escalaRad.value.range()) * 0.01)
    .attr("r2", d3.max(escalaRad.value.range()) * 0.01)
    .attr("fillStyle", "#CAFF66");
}
function configurandoPictos() {
  pictos.value
    .attr("r", d3.max(escalaRad.value.range()) * 0.01)
    .style("fill", "#caff66")
    .attr(
      "cx",
      (d) => ancho.value * 0.5 + escalaRad.value(d.rad) * Math.cos(d.ang)
    )
    .attr(
      "cy",
      (d) => alto.value * 0.5 + escalaRad.value(d.rad) * Math.sin(d.ang)
    )

    .attr("opacity", 0);

  context.value.save();
  context.value.clearRect(
    -margenes.value.izquierda,
    -margenes.value.arriba,
    margenes.value.derecha + margenes.value.izquierda + ancho.value,
    margenes.value.abajo + margenes.value.arriba + alto.value
  );
  console.log(dataBinding.value)
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
    .querySelector("#texto-intro-scroll-horizontal")
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
  } else if (posicion.value <= -150) {
    paso_activo.value = 2;
  }
  console.log(posicion.value, paso_activo.value);
}
watch(paso_activo, (nv, ov) => {
  if (nv == 0) {
    pictos.value
      .attr("opacity", 0)
      .style("fill", "#caff66")
      .attr(
        "cx",
        (d) => ancho.value * 0.5 + 1 * escalaRad.value(d.rad) * Math.cos(d.ang)
      )
      .attr(
        "cy",
        (d) => alto.value * 0.5 + 1 * escalaRad.value(d.rad) * Math.sin(d.ang)
      )
      .transition()
      //.duration(300)
      .delay((d) => d.i % 700)
      .attr("opacity", 0.5);
  }
  if (nv == 1) {
    pictos.value
      .transition()
      //.duration(300)
      .delay((d) => d.i % 700)
      .attr(
        "cx",
        (d) => ancho.value * 0.5 + 1 * escalaRad.value(d.rad) * Math.cos(d.ang)
      )
      .attr(
        "cy",
        (d) => alto.value * 0.5 + 1 * escalaRad.value(d.rad) * Math.sin(d.ang)
      )

      .filter((d) => d.i < 1846)
      .style("fill", "#caff66")

      .transition()
      //.duration(300)
      .delay((d) => d.i % 700)

      .style("fill", "#ff5ebc");
  } else if (nv == 2) {
    pictos.value
      .transition()
      .duration(300)
      .delay((d) => d.i % 300)
      .attr(
        "cx",
        (d) =>
          ancho.value * 0.5 +
          (d3.max([ancho.value, alto.value]) + escalaRad.value(d.rad)) *
            Math.cos(d.ang)
      )
      .attr(
        "cy",
        (d) =>
          alto.value * 0.5 +
          (d3.max([ancho.value, alto.value]) + escalaRad.value(d.rad)) *
            Math.sin(d.ang)
      );
  }
});
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
#texto-intro-scroll-horizontal {
  //background: #fff;
  //color: black;
  width: 100vw;
  height: 330vh;
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
          max-width: 600px;
          padding: 0 16px;
          strong.rosa {
            background: #ff5ebc;
          }
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
      }
    }
    svg,
    canvas {
      //background: rgb(206, 206, 206);
      position: absolute;
      top: 0;
    }
  }
}
</style>