<template>
  <div id="pagina-inicio">
    <InteractivosPortada></InteractivosPortada>
    <section id="portada" class="contenedor-flex">
      <div class="titulo">
        <h1>Abuso sexual en escuelas.</h1>
        <h2>Los casos que la SEP guarda debajo de la alfombra.</h2>
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
      <p>
        En la última década se han registrado 3,865 casos de abuso sexual en
        escuelas de educación básica: uno cada día. Los principales agresores
        son docentes. Niños con terrores nocturnos, que cambian su temperamento,
        que pierden el habla o el interés por ir a la escuela son algunas de las
        secuelas que existen. A pesar del cúmulo de testimonios, las secretarías
        de educación han hecho oídos sordos y, en algunos casos, incumplido sus
        propios protocolos de actuación. Así la violencia sexual habita todos
        los días las aulas del país.
      </p>
    </section>
    <section id="texto-intro" class="contenedor-flex">
      <div class="ancho-texto">
        <p>
          “En esta escuela nunca ha ocurrido algo similar”. Esta fue la única
          respuesta que recibieron los padres de familia que acudieron ante la
          directora del Centro de Atención Múltiple 7 (CAM) “Gabriela Mistral”,
          ubicado en Ecatepec, Estado de México, al denunciar que el profesor de
          salud había agredido sexualmente a sus hijas e hijos.
        </p>
        <p>
          Pero una sola denuncia ante las autoridades bastó para que comenzaran
          a brotar las agresiones que se escondían detrás de las puertas de esta
          escuela. En un abrir y cerrar de ojos, padres y madres se dieron
          cuenta que ninguno de sus casos existía ante el Órgano Interno de
          Control de los Servicios Educativos Integrados al Estado de México
          (SEIEM) y mucho menos en las estadísticas del Ministerio Público,
          procedimientos que la directora evitó hacer ante cada queja
          interpuesta contra el maestro Héctor “N”.
        </p>
        <p>
          El CAM 7 es sólo una de las escuelas en las que algún adulto, miembro
          de la comunidad educativa, ha violentado sexualmente a estudiantes de
          educación básica. También un reflejo de lo que ocurre en todo el país,
          donde las escuelas y las secretarías de educación evitan seguir los
          lineamientos de prevención y atención a estos casos.
        </p>
      </div>
    </section>

    <InteractivosHorizontalSepFiscalia></InteractivosHorizontalSepFiscalia>
    <section id="cita-1" class="contenedor-flex">
      <div class="ancho-texto">
        <blockquote>
          “Muchas familias se van, abandonan por el tiempo que lleva un proceso.
          Pierden su trabajo, recursos, se divorcian, abandonan a los otros
          hijos. La Fiscalía, que no está capacitada para esto, desestima varias
          denuncias”, recalca.
        </blockquote>
      </div>
    </section>
    <section id="casos-particulares" class="contenedor-flex">
      <div class="ancho-texto">
        <p>
          Parecen casos aislados, atípicos, pero no lo son. Las actas de hechos
          relacionadas con quejas y denuncias por delitos sexuales cometidos por
          personal de colegios públicos y privados en contra de estudiantes de
          educación básica muestran similitudes en el actuar de los adultos con
          cargos en las escuelas.
        </p>
        <p>
          En Querétaro, por ejemplo, hay un profesor de primaria que es
          reincidente: tiene quejas previas por pedofilia en otros colegios; la
          más reciente, de 2017, revela que besa a las niñas en la boca, las
          lleva a su carro y las pone de cabeza para mirar su vulva.
        </p>
      </div>
    </section>
    <section id="casos-particulares-2" class="contenedor-flex">
      <div class="ancho-texto">
        <p>
          En Veracruz, un profesor de secundaria abusó sexualmente de varias
          alumnas y las amenazó con sus calificaciones; ya tenía un expediente
          previo por denuncias similares.
        </p>
        <p>
          Las estadísticas muestran una deficiencia clara en la prevención de
          este delito, comenzando por lo más básico: los procedimientos de
          elección del personal.
        </p>
      </div>
    </section>
    <InteractivosHorizontalAgresores></InteractivosHorizontalAgresores>
    <section id="perfiles-victimas" class="contenedor-flex">
      <div class="ancho-texto">
        <p>
          Las víctimas, en cambio, son diversas. De las más de mil quejas que
          entregaron las Secretarías de Educación vía transparencia, se logró
          identificar a 1,559 víctimas, de las cuales el 68% son mujeres, pero
          también está el registro de 246 varones que sufrieron violencia sexual
          dentro de los centros escolares
        </p>
        <p>
          En algunos casos, hay múltiples víctimas y victimarios. En 18 estados
          de la República se tienen, hasta ahora, 50 casos en donde no se cuenta
          con detalles de los alumnos abusados o de los agresores, únicamente se
          detalla cómo “varias personas”. Se vuelve “común” encontrar registros
          en donde se enlista al director, intendente, encargado de cooperativa
          y docente como un grupo de agresores en contra de los menores.
        </p>
      </div>
    </section>

    <InteractivosHorizontalProtocolos></InteractivosHorizontalProtocolos>
  </div>
</template>
<style lang="scss">
#pagina-inicio {
  position: relative;
  z-index: 1;
  #portada {
    height: calc(100vh - 50px);
    .titulo {
      margin: auto;
      text-align: center;
      color: $color-texto-claro;
      max-width: 680px;
      background-color: $color-fondo-oscuro;
      backdrop-filter: blur(2px);
      padding: 16px;
      border-radius: 16px;
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
          &.eluniversal{
            width: calc(60% - 40px);
            max-width: 250px;
          }
          &.connectas{
            width: calc(40% - 40px);
            max-width: 180px;

          }
          a{
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
      background-color: $color-fondo-oscuro;
      padding: 16px;
      font-size: 18px;
      border-radius: 16px;
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
      background-color: $color-fondo-oscuro;
      padding: 16px;
      font-size: 18px;
      border-radius: 16px;
    }
  }
  section {
    min-height: 100vh;
    padding: 0 16px;
  }

.texto-intro-scroll-horizontal {
  padding: 0 ;

  background-color: transparent;
  transition: background-color 0.75s ease;

  &.seccion-activa {
    background-color: $color-fondo-claro;
  }
  color: $color-texto-oscuro;
  width: 100vw;
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
        .ancho-texto,
        .ancho-bullet {
          border-radius: $radio-borde;

          background: #e0e0e0cc;
          backdrop-filter: blur(4px);
          @media (max-width: $pantalla-movil) {
            max-width: 80vw;
          }

          padding: 0 16px;
          p {
            @media (max-width: $pantalla-movil) {
              font-size: 14px;
            }
          }
          p.bullet {
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
      }
    }
    canvas, svg.svg-viz-horizontal {
      //background: rgb(206, 206, 206);
      position: absolute;
      top: 0;
    }
  }
}
}
</style>
