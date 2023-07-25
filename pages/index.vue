<template>
  <div id="pagina-inicio">
    <InteractivosPortada></InteractivosPortada>
    <section id="portada" class="contenedor-flex">
      <div class="titulo bullet-fondo-oscuro-transparencia">
        <h1>Depredadores en las aulas</h1>

        <div class="logos contenedor-flex">
          <div class="eluniversal">
            <a href="https://www.eluniversal.com.mx/" target="_blank">
              <img
                src="~/assets/imgs/logos/logo-eluniversal.svg"
                alt="logo de Universal"
              />
            </a>
          </div>
          <div class="connectas">
            <a href="https://www.connectas.org/" target="_blank">
              <img
                src="~/assets/imgs/logos/connectas_blanco.svg"
                alt="logo de Connectas"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
    <section id="sumario" class="contenedor-flex">
      <p class="bullet-fondo-oscuro-transparencia sumario">
        Diariamente, un niño o niña son agredidos sexualmente por el personal de
        las escuelas a las que asisten. Mientras que el gobierno mexicano ha
        fallado en garantizar la seguridad al interior de las aulas, el número
        de denuncias va en aumento.
        <br />
        Por Alejandra Crail y Daniela Guazo
      </p>
    </section>
    <section class="img-ppal">
      <div class="cover-portada-img">
        <div class="degradado-oscuro"></div>
      </div>
    </section>
    <section id="caso" class="contenedor-flex">
      <p class="bullet-fondo-oscuro-transparencia">
        J. salió de la escuela sumido en llanto, envuelto en un intenso dolor.
        Al llegar a casa, su madre se dio cuenta de que el niño de tres años
        tenía heridas en el área rectal. Llevaba apenas 27 días como alumno de
        1° de jardín de niños. Más tarde, se sabría que “Cantos”, el maestro de
        música, y Servando “el que barre”, lo agredieron sexualmente en el
        kínder.
      </p>
    </section>

    <InteractivosHorizontalSepFiscalia></InteractivosHorizontalSepFiscalia>

    <section id="cierre" class="contenedor-flex">
      <div class="ancho-texto bullet-fondo-oscuro-transparencia">
        <p>
          Para esta investigación se solicitaron estadísticas y versiones
          públicas de las actas de hechos de estos delitos registrados en las
          secretarías de Educación de los 32 estados del país. Se creó una base
          de datos a nivel nacional que reúne los casos registrados de manera
          oficial entre 2012 y febrero de 2023, así se pudo determinar que en
          México todos los días ocurre una agresión sexual cometida por el
          personal de las escuelas en contra de sus estudiantes de educación
          básica.
        </p>
        <p>
          Aunque desde 2016 el gobierno federal intentó homologar la prevención
          y atención a estos delitos en las aulas por medio de protocolos de
          atención, los casos lejos de reducirse van en aumento. El regreso a
          clases tras la pandemia aumentó la violencia sexual contra niñas,
          niños y adolescentes. Los datos oficiales arrojan un patrón: la
          mayoría de los agresores son hombres, resaltan los docentes.
        </p>
        <blockquote>
          “Nosotros les dimos toda la confianza, les entregamos nuestro más
          grande tesoro y fuimos defraudados”, dice la madre de J.
        </blockquote>
      </div>
    </section>
    <section class="final">
      <div class="titulo-historias">Lee la investigación completa</div>
      <div class="contenedor-flex contenedor-tarjetas">
        <NavegacionTarjetas
          class="t-50"
          :ruta="'secreto-escolar'"
          :titulo="'Secreto escolar'"
          :descripcion="'En la última década se triplicó el abuso sexual infantil dentro de las escuelas'"
        ></NavegacionTarjetas>
        <NavegacionTarjetas
          class="t-50"
          :ruta="'nuestros-protocolos-no-existen'"
          :titulo="`&quot;Nuestros protocolos no existen&quot;`"
          :descripcion="'La historia de una política fallida'"
        ></NavegacionTarjetas>
      </div>
    </section>
  </div>
  <NavegacionCompartidera
    :link="'https://interactivos.eluniversal.com.mx/2023/abuso-sexual-escuelas'"
    :texto="description"
    :hashtags="'Depredadoresenlasaulas'"
  ></NavegacionCompartidera>
</template>
<script setup>
import { ref } from "vue";
const title = ref("Depredadores en las aulas");
const description =
  ref(`Diariamente, un niño o niña son agredidos sexualmente por el personal de
        las escuelas a las que asisten. Mientras que el gobierno mexicano ha
        fallado en garantizar la seguridad al interior de las aulas, el número
        de denuncias va en aumento`);
useSeoMeta({
  title: title,
  ogTitle: title,
  description: description,
  ogDescription: description,
  ogImage: "https://example.com/image.png",
  twitterCard: "summary_large_image",
});
</script>
<style lang="scss">
#pagina-inicio {
  position: relative;
  z-index: 1;
  background: $color-fondo-oscuro;
  #portada {
    height: calc(100vh - 50px);
    .titulo {
      margin: auto;
      text-align: center;
      color: $color-texto-claro;
      max-width: 600px;
      h1 {
        font-size: 76px;
        font-family: "Roboto Slab";
        font-weight: 400;
        border-bottom: solid 2px $color-texto-claro;
        margin: 8px 0;
        padding: 16px 0;
        letter-spacing: 7px;
        line-height: 0.9;
        @media (max-width: $pantalla-movil) {
          font-size: 40px;
        }
      }
      h2 {
        font-size: 28px;
        font-weight: 300;
        margin: 8px 0;
        padding: 8px 0;

        @media (max-width: $pantalla-movil) {
          font-size: 24px;
        }
      }
      .autoras {
        font-size: 18px;
      }
      .logos {
        width: 100%;
        flex-wrap: nowrap;
        gap: 40px;
        align-items: center;
        justify-content: center;
        div {
          &.eluniversal {
            width: calc(60% - 40px);
            max-width: 250px;
          }
          &.connectas {
            width: calc(40% - 40px);
            max-width: 180px;
          }
          a {
            display: block;
            width: 100%;
          }
          img {
            width: 100%;
            margin: auto;
          }
        }
      }
    }
  }
  #sumario {
    height: calc(120vh);
    p {
      max-width: 500px;
      color: $color-texto-claro;
      margin: auto;
      font-size: 18px;
    }
  }
  #caso {
    height: calc(100vh);
    background: $color-fondo-oscuro;

    p {
      max-width: 500px;
      color: $color-texto-claro;
      margin: auto;
      font-size: 18px;
    }
  }
  p.sumario {
    text-align: center;
  }

  #cita-1 {
    min-height: 100vh;
  }

  section {
    min-height: 100vh;
    padding: 0 16px;
  }
  section#cierre {
    background: $color-fondo-oscuro;
  }
  #texto-horizontal-sep-fiscalia {
    padding: 0;
    background-color: $color-fondo-oscuro;
    &.seccion-activa {
      background-color: $color-fondo-claro;
    }
  }
  section.final {
    padding: 0;
    background: $color-fondo-oscuro;
    .titulo-historias {
      width: 100%;
      text-align: center;
      font-size: 32px;
      font-weight: 700;
      padding: 48px 0;
    }

    .contenedor-flex.contenedor-tarjetas {
      max-width: 800px;
      padding: 16px;
      gap: 32px;
      margin: auto;
      padding-bottom: 150px;
    }
  }
  section.img-ppal {
    padding: 0;
    background: $color-fondo-oscuro;
    .cover-portada-img {
      width: 100%;
      height: 100vh;
      background-size: cover;
      background-position: center;
      background-image: url("@/assets/imgs/inicio/ilustracion_1.jpg");
      box-shadow: inset 0px 10px 10px $color-fondo-oscuro;
      //-moz-box-shadow: inset 10px 10px 5px $color-fondo-oscuro;
      //-webkit-box-shadow: inset 10px 10px 5px $color-fondo-oscuro;
      //-khtml-box-shadow: inset 10px 10px 5px $color-fondo-oscuro;
      display: flex;
      div.degradado-oscuro {
        position: relative;
        width: 100%;
        background: linear-gradient(
          transparent,
          $color-fondo-oscuro,
          $color-fondo-oscuro
        );
        display: flex;
        align-items: stretch;
        margin-top: auto;
        div.contenido-abajo {
          margin-top: auto;
          padding-top: 78px;
          width: 100%;
          text-align: center;
          font-size: 32px;
          font-weight: 700;
        }
      }
    }
  }
}
</style>
