<template>
  <NavegacionEncabezado></NavegacionEncabezado>
  <div class="vista"><slot /></div>
  <NavegacionPie></NavegacionPie>
  <iframe
    id="iframe-connectas"
    width="100%"
    height="1"
    src="https://www.connectas.org/RECURSOS/depredadores-en-las-aulas.html"
    frameborder="0"
    scrolling="no"
    style="
      width: 100%;
      height: 1px !important;
      padding: 0;
      margin: 0;
      min-height: 1px;
      border: 0;
      display: block;
      overflow: hidden !important;
    "
  ></iframe>
</template>
<script setup>
import { onMounted, onUpdated } from "vue";
const footer = ref();
const vista = ref();
const iframe_connectas = ref()
onMounted(() => {
  borrandoDuplicados();
});
onUpdated(() => {
  borrandoDuplicados();
});

function borrandoDuplicados() {
  vista.value = document.querySelectorAll("div.vista");
  vista.value.forEach((el, i) => {
    if (i > 0) {
      el.remove();
    }
  });
  footer.value = document.querySelectorAll("footer.contenedor-flex");

  footer.value.forEach((el, i) => {
    if (i > 0) {
      el.remove();
    }
  });
  iframe_connectas.value = document.querySelectorAll("iframe#iframe-connectas");

  iframe_connectas.value.forEach((el, i) => {
    if (i > 0) {
      el.remove();
    }
  });
}
</script>


<style lang="scss">
.texto-intro-scroll-horizontal {
  padding: 0;
  margin: 0 -15px;
  background-color: transparent;
  transition: background-color 0.75s ease;

  &.seccion-activa {
    background-color: $color-fondo-claro;
  }
  color: $color-texto-oscuro;
  width: 100%;
  position: relative;
  .horizontal-scroll_contenedor {
    width: 100%;
    position: sticky;
    overflow: hidden;
    top: 0;
    .horizontal-scroll_interior {
      padding-top: 50px;
      .horizontal-scroll_item {
        width: 100%;
        height: 100vh;
        flex: 0 0 auto;
        .ancho-texto,
        .ancho-bullet {
          border-radius: $radio-borde;

          background: #e0e0e0d0;
          backdrop-filter: blur(2px);
          @media (max-width: $pantalla-movil) {
            max-width: 80vw;
            background: #e0e0e0a4;

          }

          padding: 0 16px;
          p {
            @media (max-width: $pantalla-movil) {
              font-size: 14px;
            }
          }
          p.bullet,
          ul.bullet {
            display: flex;
            flex-wrap: wrap;
            font-size: 18px;
            @media (max-width: $pantalla-movil) {
              font-size: 14px;
            }
            span {
              max-width: 500px;
              width: 100%;
            }
            span.derecha {
              text-align: right;
              margin: 0 0 0 auto;
            }
            span.izquierda {
              text-align: left;
              margin: 0 auto 0 0;
            }
            span.centro {
              text-align: center;
              margin: 0 auto;
            }
            span.dato-numerico {
              font-size: 150px;
              @media (max-width: $pantalla-movil) {
                font-size: 18vw;
              }
              &.triple {
                font-size: 70px;
                @media (max-width: $pantalla-movil) {
                  font-size: 12vw;
                }
              }
            }
          }
        }
        .ancho-bullet {
          @media (max-width: $pantalla-movil) {
            max-width: 60vw;
          }
        }
        strong {
          background-color: transparent;
        }
      }
    }
    canvas,
    svg.svg-viz-horizontal {
      //background: rgb(206, 206, 206);
      position: absolute;
      top: 0;
    }
  }
}
</style>