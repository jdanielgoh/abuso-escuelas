<template>
  <div id="pagina-inicio">
    <InteractivosPortada></InteractivosPortada>
    <section id="portada" class="contenedor-flex">
      <div class="titulo bullet-fondo-oscuro-transparencia">
        <h1>Maestros abusadores</h1>
        <p>
          Diariamente, un niño o niña son agredidos sexualmente por el personal
          de las escuelas a las que asisten. Mientras que el gobierno mexicano
          ha fallado en garantizar la seguridad al interior de las aulas, el
          número de denuncias va en aumento
        </p>
        <p>Por Alejandra Crail y Daniela Guazo</p>
        <div class="logos contenedor-flex">
          <div class="connectas">
            <a href="https://www.connectas.org/">
              <img
                src="~/assets/imgs/logos/connectas_blanco.svg"
                alt="logo de Connectas"
              />
            </a>
          </div>
          <div class="eluniversal">
            <a href="https://www.eluniversal.com.mx/">
              <img
                src="~/assets/imgs/logos/logo-eluniversal.svg"
                alt="logo de Connectas"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
    <section id="sumario" class="contenedor-flex">
      <p class="bullet-fondo-oscuro-transparencia">
        J. salió de la escuela sumido en llanto, envuelto en un intenso dolor.
        Al llegar a casa, su madre se dio cuenta de que el niño de tres años
        tenía heridas en el área rectal. Llevaba apenas 27 días como alumno de
        1° de jardín de niños. Más tarde, se sabría que “Cantos”, el maestro de
        música, y Servando “el que barre”, lo agredieron sexualmente en el
        colegio.
      </p>
    </section>

    <InteractivosHorizontalSepFiscalia></InteractivosHorizontalSepFiscalia>

    <section id="casos-particulares" class="contenedor-flex">
      <div class="ancho-texto bullet-fondo-oscuro-transparencia">
        <p>
          Para esta investigación se solicitaron estadísticas y versiones
          públicas de las actas de hechos de estos delitos registrados en las
          secretarías de Educación de los 32 estados del país. Se creó la
          primera base de datos a nivel nacional que reúne los casos registrados
          de manera oficial, así se pudo determinar que en México todos los días
          ocurre una agresión sexual cometida por el personal de las escuelas en
          contra de sus estudiantes de educación básica.
        </p>
      </div>
    </section>
    <section id="casos-particulares-2" class="contenedor-flex">
      <div class="ancho-texto bullet-fondo-oscuro-transparencia">
        <p>
          Aunque desde 2016 el gobierno federal intentó homologar la prevención
          y atención a estos delitos en las aulas por medio de protocolos de
          atención, los casos lejos de reducirse van en aumento. El regreso a
          clases tras la pandemia duplicó la violencia sexual contra niñas,
          niños y adolescentes. Los datos oficiales arrojan un patrón: la
          mayoría de los agresores son hombres, resaltan los docentes.
        </p>
      </div>
    </section>
    <section id="cita-1" class="contenedor-flex">
      <div class="ancho-texto">
        <blockquote>
          “Nosotros les dimos toda la confianza, les entregamos nuestro más
          grande tesoro y fuimos defraudados”, dice la madre de J.
        </blockquote>
      </div>
    </section>

  </div>
</template>
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
      max-width: 680px;
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
    height: calc(100vh);
    p {
      max-width: 500px;
      color: $color-texto-claro;
      margin: auto;
      font-size: 18px;
    }
  }

  #cita-1 {
    min-height: 100vh;
  }
  #casos-particulares,
  #casos-particulares-2 {
    min-height: 100vh;
    .ancho-texto {
      color: $color-texto-claro;
      margin: auto;
      font-size: 18px;
    }
  }
  section {
    min-height: 100vh;
    padding: 0 16px;
  }
  #texto-horizontal-sep-fiscalia {
    padding: 0;
  }
}
</style>
