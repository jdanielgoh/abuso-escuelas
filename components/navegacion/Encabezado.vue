<script setup>
import { ref } from "vue";
const esta_abierto = ref(false);
</script>

<template>
  <div>
    <header :class="{ abierto: esta_abierto }">
      <button class="icono-hamburguesa" @click="esta_abierto = !esta_abierto">
        <span></span>
        <span></span>
        <span></span>
      </button>
      <nav>
        <ul>
          <li><NuxtLink @click.native="esta_abierto =false" to="/"> Inicio</NuxtLink>  </li>
          <li><NuxtLink @click.native="esta_abierto =false" to="historias"> Historia</NuxtLink>  </li>
          <li><NuxtLink @click.native="esta_abierto =false" to="perfiles"> Perfiles</NuxtLink>  </li>
          <li><NuxtLink @click.native="esta_abierto =false" to="protocolos"> Protocolos</NuxtLink>  </li>
          <li><NuxtLink @click.native="esta_abierto =false" to="metodologia"> Metodología</NuxtLink>  </li>

        </ul>
      </nav>
    </header>
  </div>
</template>


<style lang="scss" scoped>
header {
  position: fixed;
  z-index: 20;
  top: 0;
  width: 100%;
  height: 55px;

  button.icono-hamburguesa {
    position: absolute;
    margin: 18px 0 15px 20px;
    background: transparent;
    border: 0px;
    width: 50px;
    height: 40px;
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
    -webkit-transition: 0.5s ease-in-out;
    -moz-transition: 0.5s ease-in-out;
    -o-transition: 0.5s ease-in-out;
    transition: 0.5s ease-in-out;
    z-index: 2;
    cursor: pointer;
    span {
      display: block;
      position: absolute;
      height: 5px;
      width: 100%;
      background: $color-texto-base;
      opacity: 1;
      left: 0;
      -webkit-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      transform: rotate(0deg);
      -webkit-transition: 0.25s ease-in-out;
      -moz-transition: 0.25s ease-in-out;
      -o-transition: 0.25s ease-in-out;
      transition: 0.25s ease-in-out;
      &:nth-child(1) {
        top: 0px;
      }
      &:nth-child(2) {
        top: 17px;
      }
      &:nth-child(3) {
        top: 35px;
      }
    }
  }
  // Borde de abajo
  
  //Navegacion
  nav {
    visibility: hidden;
    top: 0;
    height: calc(100vh );
    position: relative;
    display:inline-flex;
    background: #d3d3d3;
    ul {
      padding: 0;
      margin: auto 0;
      li {
        font-size: 32px;
        left: -100%;
        position: relative;
        padding: 0;
        list-style: none;
        transition: 0.25s ease-in-out 0.1s;
        padding: 20px;
        a{
          color: $color-texto-enlaces;
          &.router-link-exact-active{
            color: $color-texto-base;
          }
        }
     
      }
    }
  }
  &.abierto {
    button.icono-hamburguesa {
      span {
        background: black;

        &:nth-child(1) {
          top: 18px;
          -webkit-transform: rotate(135deg);
          -moz-transform: rotate(135deg);
          -o-transform: rotate(135deg);
          transform: rotate(135deg);
        }
        &:nth-child(2) {
          opacity: 1;
          left: 50%;
          width: 0;
        }
        &:nth-child(3) {
          top: 18px;
          -webkit-transform: rotate(-135deg);
          -moz-transform: rotate(-135deg);
          -o-transform: rotate(-135deg);
          transform: rotate(-135deg);
        }
      }
    }

    nav {
      visibility: visible;

      ul {
        li {
          left: 0;
        }
      }
    }
  }
}
</style>