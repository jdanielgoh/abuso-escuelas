<template>
    <section id="texto-intro-scroll-horizontal">
      <div class="ancho-texto horizontal-scroll_contenedor">
        <div class="horizontal-scroll_interior contenedor-flex" :style="{transform: `translate(${posicion}%,0)`}">
          <div class="horizontal-scroll_item contenedor-flex">
            <div class="ancho-texto">
              <p>
                México ocupa el primer lugar en abuso sexual infantil, de
                acuerdo con la Organización para la Cooperación y el Desarrollo
                Económico(OCDE).<strong> Dentro de las escuelas, las Secretarías de
                Educación registraron 3,865 casos en la última década.</strong> Esto
                quiere decir que, en promedio, todos los días ocurre una
                agresión sexual contra niñas, niños y adolescentes a manos de
                personal de los colegios a los que asisten.
              </p>
            </div>
          </div>
          <div class="horizontal-scroll_item contenedor-flex">
            <div class="ancho-texto">
              <p>
                Estos datos están muy por encima de los que llegan ante los
                Ministerios Públicos en el país, en donde solo existen 1,846
                carpetas de investigación por este delito. Apenas el 50% de lo
                que se registra en las secretarías de educación del país.
              </p>
            </div>
          </div>

          <div class="horizontal-scroll_item contenedor-flex">
            <div class="ancho-texto">
              <p>
                Otras dependencias, como comisiones dederechos humanos y
                oficinas de protección a la infancia confirmaron, sin embargo,
                que en esos estados donde ni la SEP ni las Fiscalías reconocen
                el abuso sexual, estos delitos también están presentes: no hay
                un solo estado que pueda presumir de no tener registros por
                acoso, abuso sexual o violación.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
</template>
<script setup>
import {ref, onMounted, onUnmounted} from "vue"
const posicion = ref(0)

onMounted(()=>{
    window.addEventListener("scroll", posicionScroleando);
})
onUnmounted(()=>{
    window.removeEventListener("scroll", posicionScroleando);
})
function posicionScroleando(){
    let rect = document.querySelector("#texto-intro-scroll-horizontal").getBoundingClientRect()
    posicion.value = 300 * rect.top/ (rect.height )
    console.log(posicion.value, rect.top, rect.height)
}

</script>

<style lang="scss">
#texto-intro-scroll-horizontal {
    background: #fff;
    color: black;
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
        }
      }
    }
  }
  </style>