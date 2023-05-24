<template>
    <div :id="id_diagrama" class="diagrama-protocolos">{{ ancho }}
        <svg :width="ancho + margenes.izquierda + margenes.derecha" :height="alto + margenes.arriba + margenes.abajo">
            <g class="paths" :transform="`translate(${margenes.izquierda},${margenes.arriba})`"></g>
            <g class="categos" :transform="`translate(${margenes.izquierda},${margenes.arriba})`"></g>
        </svg>
    </div>
</template>
<script setup>

import {ref, onMounted} from "vue"
import * as d3 from "d3"
import diccionario_protocolos from "@/assets/datos/diccionario_protocolos.json"
console.log(diccionario_protocolos)
const props = defineProps({
    id_diagrama :{type: String, default: "id-diagrama-procolos"}
})
const svg = ref()
const grupo_paths = ref()
const grupo_categos= ref()
const datos = ref();

const ancho = ref(0)
const alto = ref(0)
const margenes = ref({
    derecha : 20,
    izquierda : 20,
    arriba : 20,
    abajo : 20,
})

// variables 
const lista_categorias = [1,2,3,4,5]
onMounted(()=>{
    svg.value = d3.select(`#${props.id_diagrama} svg`)
    grupo_paths.value = svg.value.select("g.paths")
    grupo_categos.value = svg.value.select("g.categos")
    d3.csv("/datos/base_protocolos.csv").then((data)=>{
        datos.value = data
        console.log(data)
        configurarDimensiones()
        crearPaths()
    })
})

function crearPaths(){
    grupo_paths.value.selectAll("path.edo").data(datos.value.map((d)=>{
        let dict = {"edo" : d.Estados}
        for(var i = 0 ; i< lista_categorias.length; i++){
            dict[lista_categorias[i]] = d[lista_categorias[i]]
        }
        return dict
    }))
    .enter()
    .append("path")
}
function configurarDimensiones(){
    ancho.value = document.querySelector(`#${props.id_diagrama}`).clientWidth - margenes.value.derecha - margenes.value.izquierda
    alto.value = 500
}


</script>
<style lang="scss">
.diagrama-protocolos{
    svg{background: gray;}
}
</style>