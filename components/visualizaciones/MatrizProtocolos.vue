<template>
  <div class="contenedor-vis-tabla contenido-flex" id="matriz-protocolos">
    <div class="ancho-texto">
      <div class="contenedor-flex">
        <div class="ancho-texto">
          <h3>
            Reprobados: la mayoría de los estados no cumplen con los estándares
            de atención recomendados
          </h3>
          <p>
            Explora la herramienta: descubre con qué estándares internacionales
            cumple el protocolo de atención de tu entidad.
          </p>
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
        </div>
      </div>

      <div class="contenedor-tabla">
        <table>
          <thead>
            <tr class="renglon-encabezado">
              <th>Estado</th>
              <th>Calificación</th>
              <th v-for="variable in diccionario_mostrado" :key="variable.id">
                <div class="celda-h">
                  {{ variable.encabezado_columna }}
                  <VTooltip
                    v-if="variable.info_extra"
                    :triggers="['hover', 'focus']"
                    :placement="'bottom'"
                  >
                    <button class="boton-info">i</button>

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
                  <img
                    v-if="edo[variable.id] == 2"
                    src="@/assets/imgs/iconos/si.svg"
                    alt="sí"
                    class="icono-tabla"
                  />
                  <img
                    v-if="edo[variable.id] == 0"
                    src="@/assets/imgs/iconos/no.svg"
                    alt="no"
                    class="icono-tabla"
                  />
                  <img
                    v-if="edo[variable.id] == 1"
                    src="@/assets/imgs/iconos/regular.svg"
                    alt="regular"
                    class="icono-tabla"
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="ancho-texto">
        <div class="contenedor-flex">
          <div class="ancho-texto" style="text-align: left; font-size: 14px">
            <p>
              Se asignó un valor de 0 cuando el protocolo
              <b style="color: #b51e00">no especifica</b>
              <img
                src="@/assets/imgs/iconos/no.svg"
                alt="no"
                class="icono-tabla"
                style="transform: translateY(4px)"
              />
              la acción a seguir, el valor de 1 cuando el protocolo considera de
              manera <b style="color: #d49102">parcial</b>
              <img
                src="@/assets/imgs/iconos/regular.svg"
                alt="regular"
                class="icono-tabla"
                style="transform: translateY(4px)"
              />
              la acción y se asignó el valor de 2 cuando
              <b style="color: #01ab8e">sí especifica</b>
              <img
                src="@/assets/imgs/iconos/si.svg"
                alt="sí"
                class="icono-tabla"
                style="transform: translateY(4px)"
              />
              de forma explicita la acción a seguir. Finalmente, para calcular
              los puntajes estatales se sumaron sus valores y se estandarizó. La
              calificación mínima es 0 y el valor máximo es 10, este último
              correspondería al estado en el que los protocolos cuentan con
              todos los estándares de actuación recomendados a nivel
              internacional.
            </p>
          </div>
        </div>
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
/*
import {csv} from "d3"

csv("datos/base_protocolos_tabla.csv").then(D=>{
  console.log(D)
})*/

const interpolacionColor = interpolateRgbBasis([
  "#b51e00",
  "#d49102",
  "#01ab8e",
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
  padding: 8px;
  width: calc(100% - 16px);
  max-width: 1200px;
  margin: auto;
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
  max-height: 120px;
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
    margin: auto;
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
          button.boton-info {
            font-weight: 700;
            font-style: italic;
            border-radius: 50%;
            border: solid 0px transparent;
            background: $color-fondo-oscuro-transparencia;
            color: $color-texto-claro;
            font-size: 18px;
            width: 20px;
            height: 20px;
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