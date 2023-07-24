<template>
  <footer class="contenedor-flex">
    <div class="ancho-texto">
      <div class="contenedor-flex creditos">
        <div class="creditos">
          <p>
            <NuxtLink to="/">
              <strong>Depredadores en las aulas </strong>
            </NuxtLink>
            es una investigación de
          </p>
          <div class="contenedor-flex logos">
            <div class="eluniversal contenedor-flex">
              <a href="https://www.eluniversal.com.mx/" style="margin: auto 0">
                <img
                  style="width: 200px"
                  src="~/assets/imgs/logos/logo-eluniversal.svg"
                  alt="logo de Connectas"
                />
              </a>
            </div>
            <div class="connectas">
              <a href="https://www.connectas.org/">
                <img
                  style="width: 150px"
                  src="~/assets/imgs/logos/connectas_blanco.svg"
                  alt="logo de Connectas"
                />
              </a>
            </div>
          </div>
          <p>Con el apoyo de</p>
          <div class="contenedor-flex logos">
            <div class="connectas">
              <a href="https://www.icfj.org/">
                <img
                  style="width: 150px"
                  src="~/assets/imgs/logos/icfj.png"
                  alt="logo de icfj"
                />
              </a>
            </div>
          </div>
          <p><strong style="font-size: 24px"> Créditos </strong></p>
          <p>
            <strong>Investigación</strong><br /><a
              href="https://twitter.com/AleCrail"
              >Alejandra Crail</a>
            y <a href="https://twitter.com/danygm87"> Daniela Guazo</a>
          </p>
          <p>
            <strong>Desarrollo web y visualización de datos</strong><br /><a
              href="https://tirandocodigo.mx/"
              >Daniel Gómez Hernández</a
            >
          </p>
          <p><strong>Ilustración</strong><br />Ani Cortés y Liliana Pedraza</p>
          <p><strong>Video</strong><br />Paola Reyes y Atenea Campuzano</p>
          <p>
            <strong>Análisis de protocolos</strong><br />
            Oficina de Defensoría de los Derechos de la Infancia, A.C.; Clínica
            Jurídica de Protección y Restitución de Derechos de Niñas, Niños y
            Adolescentes de la Universidad Iberoamericana, Ciudad de México; y
            El Universal
          </p>

          <p>
            <strong>Acompañamiento editorial</strong> <br />
            <a href="https://www.connectas.org/equipo-connectas/"
              >Equipo CONNECTAS</a
            >
          </p>

          <p>
            Esta investigación fue realizada por Alejandra Crail y Daniela Guazo
            para El Universal y CONNECTAS, con el apoyo del International Center
            for Journalists (ICFJ) en el marco de la Iniciativa para el
            Periodismo de Investigación en las Américas.
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  position: relative;
  z-index: 2;
  a {
    color: $color-texto-enlaces;
  }
  padding: 48px 0;
  border-top: solid;
  width: 100%;
  color: $color-texto-claro;
  background: $color-fondo-oscuro;

  div.ancho-texto {
    padding: 0 $margen-lateral;
    width: 100%;
    text-align: center;

    .contenedor-flex.logos {
      justify-content: center;
      gap: 40px;
      a {
        img {
          border-radius: 0;
        }
      }
    }
    .contenedor-flex {
      .creditos {
        margin: auto;
      }
    }
  }
}
</style>