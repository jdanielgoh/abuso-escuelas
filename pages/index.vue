<template>
  <div id="pagina-inicio">
    <InteractivosPortada></InteractivosPortada>
    <section id="portada" class="contenedor-flex">
      <div class="titulo">
        <h1>Abuso sexual en escuelas.</h1>
        <h2>Los casos que la SEP guarda debajo de la alfombra.</h2>
      </div>
    </section>
  </div>
</template>
<style lang="scss" scoped>
#pagina-inicio{
  position:relative;
  z-index: 1;
  #portada {
  height: calc(100vh - 50px);
  .titulo {
    margin: auto;
    text-align: center;
    h1 {
      font-size: 60px;
    }
    h2 {
      font-size: 24px;
      font-weight: 300;
    }
  }
}
}

</style>