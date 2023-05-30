<template>
  <div :id="id_diagrama" class="diagrama-protocolos">
    {{ ancho }}
    <svg
      :width="ancho + margenes.izquierda + margenes.derecha"
      :height="alto + margenes.arriba + margenes.abajo"
    >
      <g
        class="polylines"
        :transform="`translate(${margenes.izquierda},${margenes.arriba})`"
      ></g>
      <g
        class="categos"
        :transform="`translate(${margenes.izquierda},${margenes.arriba})`"
      ></g>
    </svg>
  </div>
</template>
<script setup>
import { ref, onMounted, toRaw } from "vue";
import * as d3 from "d3";
import diccionario_protocolos from "@/assets/datos/diccionario_protocolos.json";
const props = defineProps({
  id_diagrama: { type: String, default: "id-diagrama-procolos" },
});
const svg = ref();
const grupo_polylines = ref();
const grupo_categos = ref();
const polylines = ref();
const categorias = ref();
const rectangulos = ref();
const datos = ref();
const datos_acumulados = ref();

const escalaCategorias = ref();
const escalaSubcategorias = ref();

const ancho = ref(0);
const alto = ref(0);
const margenes = ref({
  derecha: 20,
  izquierda: 20,
  arriba: 20,
  abajo: 20,
});

// variables
const lista_categorias = ["1", "2", "3", "4", "5"];
const lista_subcategorias = ["si", "no", "parcialmente", "vacio"];
onMounted(() => {
  svg.value = d3.select(`#${props.id_diagrama} svg`);
  grupo_polylines.value = svg.value.select("g.polylines");
  grupo_categos.value = svg.value.select("g.categos");
  d3.csv("/datos/base_protocolos.csv").then((data) => {
    datos.value = data;

    let datos_ac = lista_categorias.map((cat) => {
      let dict_ef = { categoria: cat };
      let dict_mapeo = {};
      let mapeo = d3.rollup(
        datos.value.map((d) => d),
        (v) => v.length,
        (dd) => dd[cat]
      );

      lista_subcategorias.forEach((d) => {
        dict_mapeo[d] = mapeo.get(d);
      });
      dict_ef["valores"] = dict_mapeo;
      return toRaw(dict_ef);
    });
    datos_ac.forEach((d) => {
      for (var i = 0; i < lista_subcategorias.length; i++) {
        d.valores["cuenta_" + lista_subcategorias[i]] = 0;
      }
    });
    datos_acumulados.value = datos_ac;
    configurarDimensiones();
    creandoEscalas();
    crearpolylines();
    creaCategos();
    visualizandoCategos();
    visualizapolylines();
  });
});
function visualizapolylines() {
  polylines.value
    .attr("points", (d, i) => creaPoints(d, i))
    .style("stroke", d=>`rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`)
    .style("stroke-width", "9px")
    .style("stroke-opacity", ".8")

    .style("fill", "none");
}
function creaPoints(d, i) {
  let txt = "" //`-10,${(i * escalaSubcategorias.value.range()[1]) / 32} `;
  let ancho_padding = ((escalaCategorias.value.range()[1] *
        escalaCategorias.value.paddingInner()) /
        (lista_categorias.length +1)) /
    32;
  /*txt += `${
    i *
      ancho_padding
  }, ${(i * escalaSubcategorias.value.range()[1]) / 32} `;*/
  for (var ii = 0; ii < lista_categorias.length; ii++) {
    let apilado =d3.stack().keys(lista_subcategorias)([datos_acumulados.value[ii].valores])
    
    txt += `${ - .6 *escalaCategorias.value.bandwidth()+escalaCategorias.value(lista_categorias[ii])+
      (i-32) *ancho_padding}, ${escalaSubcategorias.value(apilado.filter(ddd=>ddd.key ==d[lista_categorias[ii]])[0][0][0]+
      datos_acumulados.value[ii].valores["cuenta_" + d[lista_categorias[ii]]] + 2 * lista_subcategorias.indexOf(d[lista_categorias[ii]])
    )} `;

    

    txt += `${ .5 *escalaCategorias.value.bandwidth()+escalaCategorias.value(lista_categorias[ii])+
      (i) *ancho_padding}, ${escalaSubcategorias.value(apilado.filter(ddd=>ddd.key ==d[lista_categorias[ii]])[0][0][0]+
      datos_acumulados.value[ii].valores["cuenta_" + d[lista_categorias[ii]]] +2* lista_subcategorias.indexOf(d[lista_categorias[ii]])
    )} `;

    

    

    // Seleccionamos por indice, no por clave
    datos_acumulados.value[ii].valores[
      "cuenta_" + d[lista_categorias[ii]]
    ] += 1;
  }
  //console.log(d, datos_acumulados.value)
  return txt;
}
function creandoEscalas() {
  escalaCategorias.value = d3
    .scaleBand()
    .domain(lista_categorias)
    .range([0, ancho.value])
    .paddingInner(0.90)
    .paddingOuter(0.90);
  escalaSubcategorias.value = d3
    .scaleLinear()
    .domain([0, 36])
    .range([0, alto.value]);
}
function visualizandoCategos() {
  rectangulos.value
    .attr("width", escalaCategorias.value.bandwidth)
    .attr("height", (d) => escalaSubcategorias.value(d[0][1] - d[0][0]))
    .attr("x", function () {
      return escalaCategorias.value(this.parentNode.__data__.categoria);
    })
    .attr("y", (d) =>
      escalaSubcategorias.value(d[0][0] + 2 * lista_subcategorias.indexOf(d["key"]))
    )
    .style("opacity", 0.5);
}

function creaCategos() {
  console.log(datos_acumulados);
  categorias.value = grupo_categos.value
    .selectAll("g.categoria")
    .data(toRaw(datos_acumulados.value))
    .enter()
    .append("g")
    .attr("class", "categoria");
  rectangulos.value = categorias.value
    .selectAll("rects")
    .data((d) => d3.stack().keys(lista_subcategorias)([d.valores]))
    .enter()
    .append("rect");
}
function crearpolylines() {
  polylines.value = grupo_polylines.value
    .selectAll("polyline.edo")
    .data(
      datos.value.map((d) => {
        let dict = { edo: d.Estados };
        for (var i = 0; i < lista_categorias.length; i++) {
          dict[lista_categorias[i]] = d[lista_categorias[i]];
        }
        return dict;
      })
    )
    .enter()
    .append("polyline");
}
function configurarDimensiones() {
  ancho.value =
    document.querySelector(`#${props.id_diagrama}`).clientWidth * 2 -
    margenes.value.derecha -
    margenes.value.izquierda;
  alto.value = 500;
}
</script>
<style lang="scss">
.diagrama-protocolos {
  svg {
  }
}
</style>
