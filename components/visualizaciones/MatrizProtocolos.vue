<template>
    <div class="contenedor-vis-tabla">
        <table>
            <tr> 
                <th>Estado</th>
                <th v-for="(variable) in diccionario_mostrado" :key="variable.id" >
                <div class="celda-h">{{ variable.variable }}</div>
                </th>
            </tr>
            <tr v-for="(edo, i) in datos_mostrados" :key="i">
                <th> {{edo.Estado}}</th>
                <th v-for="(variable) in diccionario_mostrado" :key="variable.id">
                {{ edo[variable.id] }}
                </th>
            </tr>

        </table>
    </div>
</template>
<script setup >
import datos from "@/assets/datos/matriz_protocolos.json";

import diccionario from "@/assets/datos/diccionario_matriz_procolos.json";
import {ref} from "vue"
console.log(datos, diccionario)
const datos_mostrados = ref(datos)
const diccionario_mostrado = ref(diccionario)
/*import * as d3 from "d3"
d3.csv("datos/base_protocolos_tabla.csv").then(datum => {
    console.log(datum)
})*/
</script>
<style scoped lang="scss">
.celda-h{
    max-height: 100px;
    overflow-y: scroll;
}
</style>