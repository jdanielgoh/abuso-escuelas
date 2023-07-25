<template>
  <NuxtLink :to="ruta" class="tarjeta-historia">
    <div class="imagen-tarjeta">
      <img
        src="~/assets/imgs/cap1/ilustracion_1.jpg"
        alt=""
        v-if="titulo == 'Secreto escolar'"
      />
      <img
        src="~/assets/imgs/cap2/ilustracion_1.jpg"
        alt=""
        v-if="titulo == `&quot;Nuestros protocolos no existen&quot;`"
      />
    </div>
    <div class="contenido-texto">
      <p class="conflicto">
        <b>{{ titulo }}</b>
      </p>

      <p class="descripcion">{{ descripcion }}</p>
    </div>
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  ruta: { type: String },
  titulo: { type: String },
  descripcion: { type: String },
  imagen: { type: String },
});
</script>
<style lang="scss">
.tarjeta-historia {
  text-decoration: none;
  &.t-50 {
    width: 50%;
  }
  box-shadow: 0px 0px 10px #e0e0e048;
  background: #e0e0e015;
  color: $color-texto-enlaces;
  position: relative;
  margin: 0 0 16px 0;

  border-radius: $radio-borde;
  .imagen-tarjeta {
    width: 100%;
    position: relative;
    height: 300px;
    @media (max-width: 600px) {
      height: 150px;
    }
    img {
      position: absolute;
      filter: grayscale(100%);
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      object-fit: cover;
      object-position: 50% 50%;
      border-top-right-radius: $radio-borde;
      border-top-left-radius: $radio-borde;
      -webkit-transition: all 0.3s ease;
      -ms-transition: all 0.3s ease;
      transition: all 0.3s ease;
    }
  }
  &:hover {
    box-shadow: 0px 0px 15px #e0e0e093;

    .imagen-tarjeta {
      img {
        filter: grayscale(0%);
      }
    }
  }
  .contenido-texto {
    padding: 16px 16px 16px 16px;
    font-size: 14px;
    position: relative;
    text-align: center;
    p {
      margin: 5px 0;
    }
    .conflicto {
      font-size: 22px;
      @media (max-width: $pantalla-movil) {
        font-size: 18px;
      }
    }
    .descripcion {
      font-size: 18px;
      @media (max-width: $pantalla-movil) {
        font-size: 16px;
      }
    }
    a.enlace {
      transition: all 0.2s linear;

      background: $color-fondo-oscuro;
      color: $color-texto-claro;
      padding: 8px;
      border-radius: $radio-borde;
      margin: 8px 0;
      display: inline-block;
      font-weight: 700;
      text-decoration: none;
      &:hover {
        color: #000;
        background: #fff;
      }
    }
  }
}
</style>