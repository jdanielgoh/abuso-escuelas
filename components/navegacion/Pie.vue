<template>
  <footer class="contenedor-flex">
    <div class="ancho-texto">
      <div class="contenedor-flex creditos">
        <div class="creditos">

          <div class="contenedor-flex logos">
            <div class="eluniversal contenedor-flex">
              <a target="_blank" href="https://www.eluniversal.com.mx/" style="margin: auto 0">
                <img
                  style="width: 200px"
                  src="~/assets/imgs/logos/logo-eluniversal.svg"
                  alt="logo de el universal"
                />
              </a>
            </div>
            <div class="contenedor-flex logos">
            
          </div>
            <div class="connectas">
              <a target="_blank" href="https://www.connectas.org/">
                <img
                  style="width: 150px"
                  src="~/assets/imgs/logos/connectas_blanco.svg"
                  alt="logo de Connectas"
                />
              </a>
            </div>

          </div>
          <div class="creditos">
            <p> <b>Con el apoyo de: </b></p>
            <div class="contenedor-flex logos">

            <div class="icfj contenedor-flex">
              <a target="_blank" href="https://www.icfj.org/">
                <img
                  style="width: 150px"
                  src="~/assets/imgs/logos/icfj.png"
                  alt="logo de icfj"
                />
              </a>
            </div>
            </div>
          </div>
          
          <p><strong style="font-size: 24px"> Créditos </strong></p>
          <p>
            <strong>Investigación</strong><br /><a
              href="https://twitter.com/AleCrail"
              >Alejandra Crail</a>
            y <a target="_blank" href="https://twitter.com/danygm87"> Daniela Guazo</a>
          </p>
          <p>
            <strong>Desarrollo web y visualización de datos</strong><br /><a
              href="https://tirandocodigo.mx/" target="_blank"
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
            <a target="_blank" href="https://www.connectas.org/equipo-connectas/"
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