<template>
  <div id="pagina-inicio">
    <InteractivosPortada></InteractivosPortada>
    <section id="portada" class="contenedor-flex">
      <div class="titulo">
        <h1>Abuso sexual en escuelas.</h1>
        <h2>Los casos que la SEP guarda debajo de la alfombra.</h2>
      </div>
    </section>
    <section id="intro" class="contenedor-flex">
      <p>
        En la última década se han registrado 3,865 casos de abuso sexual en
        escuelas de educación básica: uno cada día. Son profesores, personal
        administrativo o de intendencia los principales agresores. Pese al
        cúmulo de casos, las secretarías de educación han hecho oídos sordos. La
        violencia sexual habita las aulas.
      </p>
    </section>
    <section id="texto" class="contenedor-flex">
      <div class="ancho-texto">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi in
          tempus neque, tincidunt lacinia sem. Aenean blandit lobortis nibh,
          eget fringilla est venenatis id. Maecenas lobortis libero et dui
          bibendum, eleifend congue enim porttitor. Etiam condimentum, lorem
          quis accumsan pretium, odio arcu tincidunt orci, vel rhoncus neque
          nisl nec mi. Interdum et malesuada fames ac ante ipsum primis in
          faucibus. Nunc velit ex, malesuada nec interdum non, pharetra in enim.
          Aliquam et massa ornare, vulputate tellus eu, laoreet nisl. Donec ut
          elementum orci.
        </p>
        <p>
          Aenean hendrerit turpis rutrum nunc bibendum vestibulum. Maecenas eros
          quam, sodales a mollis sit amet, vulputate id metus. Sed tortor eros,
          pretium nec leo pellentesque, luctus malesuada magna. Sed ornare, nisi
          vel ultricies vehicula, libero nibh ornare eros, vel scelerisque dolor
          magna sit amet orci. Vestibulum libero diam, malesuada vel enim sed,
          tincidunt scelerisque erat. Aliquam consectetur feugiat ligula non
          cursus. Quisque convallis erat in eleifend pharetra. Proin luctus ex
          eget arcu facilisis, vel accumsan orci lacinia. Maecenas dolor dolor,
          pulvinar et auctor dapibus, tincidunt in risus. Suspendisse malesuada
          risus accumsan, fringilla nunc aliquam, fermentum nisi. Vestibulum id
          urna leo.
        </p>
        <p>
          Suspendisse a purus eu tortor vulputate dignissim. Nam quis ipsum
          velit. Ut posuere imperdiet pellentesque. Nulla quis erat ut libero
          rhoncus placerat. Aliquam erat volutpat. Phasellus pellentesque, arcu
          ac accumsan feugiat, nunc neque mattis nulla, sed blandit turpis nunc
          mollis mauris. Vestibulum dui arcu, consequat quis egestas sit amet,
          facilisis nec quam. Suspendisse dui ex, dignissim a velit eget,
          dignissim auctor magna. Nulla accumsan elementum sapien vitae
          pulvinar. Phasellus massa turpis, consequat eu vulputate id, suscipit
          et tortor. Nam et ligula purus.
        </p>
        <p>
          Ut quis suscipit purus. Sed maximus, lorem a consectetur posuere,
          turpis orci porttitor nunc, non rhoncus neque purus ut tortor.
          Vestibulum eu bibendum ante. Aenean feugiat diam nisl, id tristique
          diam volutpat in. Nullam at libero mauris. Quisque fermentum finibus
          laoreet. Class aptent taciti sociosqu ad litora torquent per conubia
          nostra, per inceptos himenaeos. Praesent ornare sapien ac magna
          finibus cursus posuere ac quam. Morbi dignissim orci vitae nunc dictum
          convallis. Aliquam eleifend, lacus eu porttitor convallis, urna arcu
          luctus mi, accumsan porttitor massa nunc vel nulla. Etiam quis velit
          nunc.
        </p>
        <p>
          Aenean maximus venenatis justo, a luctus quam dignissim sed. Nunc
          dictum magna at augue laoreet bibendum. Curabitur vitae rutrum ex.
          Nulla vitae tristique ante. Class aptent taciti sociosqu ad litora
          torquent per conubia nostra, per inceptos himenaeos. Pellentesque
          turpis magna, ullamcorper non viverra eu, dictum et mi. Proin ac
          malesuada nulla. In ultricies hendrerit felis eget vulputate. Nunc in
          scelerisque augue. Pellentesque arcu sapien, imperdiet nec imperdiet
          a, tempus sed libero.
        </p>
      </div>
    </section>
  </div>
</template>
<style lang="scss" scoped>
#pagina-inicio {
  position: relative;
  z-index: 1;
  #portada {
    height: calc(100vh - 50px);
    .titulo {
      margin: auto;
      text-align: center;
      color: $color-texto-base;
      max-width: 680px;
      background-color: rgba(30, 37, 31, 0.9);
      backdrop-filter: blur(2px);
      padding: 16px;
      border-radius: 16px;
      h1 {
        font-size: 76px;
        font-family: "Roboto Slab";
        font-weight: 400;
        border-bottom: solid 2px $color-texto-base;
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
    }
  }
  #intro {
    height: calc(100vh - 50px);
    p {
      max-width: 500px;
      color: $color-texto-base;
      margin: auto;
      background-color: rgba(30, 37, 31, 0.9);
      padding: 16px;
      font-size: 18px;
      border-radius: 16px;
    }
  }
}
</style>