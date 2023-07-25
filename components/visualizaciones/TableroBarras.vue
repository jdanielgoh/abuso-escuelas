<template>
  <div class="contenedor-flex" id="tablero-barras">
    <div class="encabezado">
      <h4>
        Registros de abuso sexual ante
        <span :style="{ color: barras_variables[0].color }">Educación</span>,
        <span :style="{ color: barras_variables[1].color }">Fiscalías</span> y
        <span :style="{ color: barras_variables[2].color }">oficinas de Protección y Derechos Humanos</span>
      </h4>
    </div>
    <div v-for="(edo, i) in datos_barras" :key="i" class="contenedor-barra">
      <VisualizacionesBarras
        :datos="[edo]"
        :variables="barras_variables"
        :barras_id="'barras-sfd' + i"
        :nombre_barra="'Entidad'"
        :nombre_color="'nombre_colores'"
        :margen="{ arriba: 16, abajo: 5, derecha: 0, izquierda: 35 }"
        titulo_eje_x=""
        titulo_eje_y=""
        :apiladas_o_agrupadas="'agrupadas'"
        :alto_vis="100"
        :orientacion="'vertical'"
        :tooltip_activo="false"
      >
        <template v-slot:encabezado>
          <p class="nom-entidad">{{ edo.Entidad }}</p>
        </template>
      </VisualizacionesBarras>
    </div>
    <div class="pie">
      <p class="nomenclatura">
        <b>NE</b> significa “No especificado”, quiere decir que la dependencia
        otorgó información que no permite determinar qué delitos ocurrieron en
        escuelas. <b>ND</b> significa “No disponible”, quiere decir que la
        dependencia clasificó la información o decidió no entregarla.
      </p>
      <p class="nomenclatura">
        <span :style="{ background: barras_variables[0].color }"></span>
        Educación
        <span :style="{ background: barras_variables[1].color }"></span>
        Fiscalias
        <span :style="{ background: barras_variables[2].color }"></span>
        Oficinas de Protección y Derechos Humanos
      </p>

      <p class="fuente">
        Fuente: Respuestas a solicitudes de información de secretarías de
        Educación, Fiscalías de justicia, comisiones de Derechos Humanos y
        Oficinas de Protección a la Infancia de los 32 estados del país.
      </p>
    </div>
  </div>
</template>
<script setup>
import { computed } from "vue";
const propiedades = defineProps({
  datos_sep_fiscalias_dh: { type: Array, default: [] },
  barras_variables: { type: Array },
});
const datos_barras = computed(() => propiedades.datos_sep_fiscalias_dh);
</script>
<style lang="scss">
#tablero-barras {
    margin: 50px auto;
  flex-wrap: wrap;
  div.encabezado {
    width: 100%;
    h4 {
      width: 100%;
      text-align: center;
    }
  }
  div.pie {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    p {
      width: 100%;
      max-width: $ancho-texto;
    }
    p.nomenclatura,
    p.fuente {
      font-size: 14px;
      margin: 5px auto;
      span {
        width: 20px;
        height: 16px;
        border-radius: 4px;
        transform: translateY(2px);
        position: relative;
        display: inline-block;
        margin: 0 0 0 20px;
      }
    }
  }

  .contenedor-barra {
    @media (max-width: $pantalla-movil) {
      width: 33.33%;
    }
    width: 16.666%;
    p.nom-entidad {
      text-align: center;
      font-size: 14px;
      font-weight: 700;
      margin-bottom: 5px;
      padding-left: 30px;
    }
  }
}
</style>