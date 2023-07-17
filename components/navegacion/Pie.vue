<template>
    <footer class="contenedor-flex">
    <div class="ancho-max">
      <div class="contenedor-flex">
        <div class="hecho">
          <a href="https://tirandocodigo.mx/" class="marca">
            <strong>Abuso sexual en escuelas</strong>
          </a>

          <p>
            Es un proyecto realizado en conjunto por 
          </p>
          <div class="contenedor-flex">
            <div class="connectas">
            <a href="https://www.connectas.org/">
              <img
              style="width: 150px"
                src="~/assets/imgs/logos/connectas_blanco.svg"
                alt="logo de Connectas"
              />
            </a>
          </div>
          <div class="eluniversal contenedor-flex">
            <a href="https://www.eluniversal.com.mx/" style="margin:auto 0 ">
              <img
              style="width: 200px"
                src="~/assets/imgs/logos/logo-eluniversal.svg"
                alt="logo de Connectas"
              />
            </a>
          </div>
          </div>
          
          <ul>
          <li><NuxtLink  to="/"> Inicio</NuxtLink>  </li>
          <li><NuxtLink  to="historias"> Historia</NuxtLink>  </li>
          <li><NuxtLink  to="perfiles"> Perfiles</NuxtLink>  </li>
          <li><NuxtLink  to="protocolos"> Protocolos</NuxtLink>  </li>
          <li><NuxtLink  to="metodologia"> Metodología</NuxtLink>  </li>

        </ul>
          <p class="header"></p>
        </div>
        <div class="contacto">
          <p><strong> Cŕeditos </strong></p>

          <p>Creditos</p>
          <div class="contenedor-flex">
            <a href="" target="_blank">
            </a>
            <a href="" target="_blank">
            </a>

          </div>
          <p>Correo</p>
          <p>
            <a href=""
              >Encuesta</a
            >
          </p>
        </div>
      </div>
    </div>
  </footer>

</template>

<style lang="scss" scoped>

footer {
    a{
        color:$color-texto-enlaces
    }
    padding: 48px 0 ;
  border-top: solid;
  width: 100%;
  color: $color-texto-claro;
    background: $color-fondo-oscuro;

  div.ancho-max {
    padding: 0 $margen-lateral;
    width: 100%;

    .contenedor-flex {
      justify-content: space-between;
      gap: 30px;

      @media (max-width: $pantalla-movil) {
        flex-wrap: wrap;
      }

      .hecho {
        max-width: 450px;

        ul {
          padding: 0;

          li {
            list-style-type: none;
          }
        }
      }

      .contacto {
        .contenedor-flex {
          gap: 0 30px;
          justify-content: flex-start;
        }
      }
    }
  }
}
</style>