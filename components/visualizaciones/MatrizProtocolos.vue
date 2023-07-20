<template>
  <div class="contenedor-vis-tabla contenido-flex" id="matriz-protocolos">
    <div class="ancho-texto">
      <fieldset>
        <legend>Selecciona una categoría</legend>
        <select
          name="selector-categorias"
          id="selector-categorias"
          v-model="categoria_seleccionada"
        >
          <option
            :value="categoria"
            v-for="(categoria, i) in categorias"
            :key="i"
          >
            {{ categoria }}
          </option>
        </select>
      </fieldset>

      <div class="contenedor-tabla">
        <table>
          <thead>
            <tr class="renglon-encabezado">
              <th>Estado</th>
              <th>Puntaje</th>
              <th v-for="variable in diccionario_mostrado" :key="variable.id">
                <div class="celda-h">
                  {{ variable.encabezado_columna }}
                  <VTooltip
                    v-if="variable.info_extra"
                    :triggers="['hover', 'focus']"
                    :placement="'bottom'" 
                  >
                    <button>i</button>

                    <template #popper>
                      {{ variable.info_extra }}
                    </template>
                  </VTooltip>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(edo, i) in datos_mostrados" :key="i">
              <td>{{ edo.Estado }}</td>
              <td
                class="puntaje"
                :style="{ color: interpolacionColor(edo.puntaje / 10) }"
              >
                {{ edo.puntaje }}
              </td>

              <td v-for="variable in diccionario_mostrado" :key="variable.id">
                <div class="contenedor-flex">
                  <Transition name="icono">
                    <img
                      v-if="edo[variable.id] == 2"
                      src="@/assets/imgs/iconos/si.svg"
                      alt="sí"
                      class="icono-tabla"
                    />
                  </Transition>
                  <Transition name="icono">
                    <img
                      v-if="edo[variable.id] == 0"
                      src="@/assets/imgs/iconos/no.svg"
                      alt="no"
                      class="icono-tabla"
                    />
                  </Transition>
                  <Transition name="icono">
                    <img
                      v-if="edo[variable.id] == 1"
                      src="@/assets/imgs/iconos/regular.svg"
                      alt="regular"
                      class="icono-tabla"
                    />
                  </Transition>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script setup >
import datos from "@/assets/datos/matriz_protocolos.json";

import diccionario from "@/assets/datos/diccionario_matriz_procolos.json";

import { ref, watch } from "vue";
import { sum } from "d3-array";
import { interpolateRgbBasis } from "d3-interpolate";

/*import {csv} from "d3"

csv("datos/diccionario-categorias - diccionario-categorias.csv").then(D=>{
  console.log(D)
})*/

const interpolacionColor = interpolateRgbBasis([
  "#b51e00",
  "#d49102",
  "#00b55e",
]);
const categoria_seleccionada = ref("Todas las categorias");
const categorias = ref([
  "Todas las categorias",
  ...new Set(diccionario.map((d) => d.categoria)),
]);
const datos_mostrados = ref(datos);
const diccionario_mostrado = ref(diccionario);

cambioCategoria(categoria_seleccionada.value);
function getUrlImagen(tipo) {
  let img_path = `../../assets/imgs/iconos/${
    tipo == 0 ? "no" : tipo == 1 ? "regular" : "si"
  }.svg`;
  let url = new URL(img_path, import.meta.url).href;
  return url;
}
watch(categoria_seleccionada, cambioCategoria);
function cambioCategoria(nv) {
  if (nv == "Todas las categorias") {
    diccionario_mostrado.value = diccionario;
  } else {
    diccionario_mostrado.value = diccionario.filter((d) => d.categoria == nv);
  }
  datos_mostrados.value = [...datos].map((d) => {
    return {
      puntaje:
        Math.round(
          (0.5 *
            100 *
            sum(diccionario_mostrado.value.map((cat) => d[cat.id]))) /
            diccionario_mostrado.value.length
        ) / 10,
      ...d,
    };
  });
}
</script>
<style>
.v-popper--theme-tooltip .v-popper__inner {
  max-width: 200px;
  font-size: 14px;
}
</style>
<style scoped lang="scss">
#matriz-protocolos {
  width: 100%;
  fieldset {
    border: none;
    padding: 8px;
    margin: 0;
    legend {
      display: block;
      position: relative;
    }
    select {
      border-radius: $radio-borde;
      padding: 8px;
      border: solid 2px $color-texto-oscuro;
      background: #fff;
    }
  }
}
.celda-h {
  max-height: 100px;
  overflow-y: auto;
  min-width: 120px;
  font-size: 14px;
  font-weight: 400;
  
}
img.icono-tabla {
  max-height: 20px;
  margin: auto;
}
div.contenedor-tabla {
  width: 100%;
  display: block;
  overflow-x: auto;
  overflow-y: auto;
  position: relative;
  max-height: calc(100vh - 100px);

  table {
    border-collapse: collapse;
    thead {
      tr {
        th {
          background: #e2e2e2;
          padding: 0.25rem;
          position: -webkit-sticky; // for safari
          position: sticky;
          top: 0;
          left: 0;
          &:first-child {
            z-index: 3;
          }
        }
      }
    }
    tr {
      td,
      th {
        &:first-child {
          position: -webkit-sticky; // for safari
          position: sticky;
          left: 0px;

          z-index: 2;
        }
      }
      td {
        padding: 0.25rem;

        &.puntaje {
          font-weight: 700;
          text-align: center;
        }
      }
      &:nth-child(odd) {
        td {
          background: #fff;
        }
      }
      &:nth-child(even) {
        td {
          background: #eeeeee;
        }
      }
    }
    .icono-enter-active,
    .icono-leave-active {
      transition: opacity 0.5s ease;
    }

    .icono-enter-from,
    .icono-leave-to {
      opacity: 0;
    }
  }
}
</style>