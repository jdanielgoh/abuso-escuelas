<template>
  <div class="compartidera">
    <nav aria-label="Links-compartir">
      <ul>
        <li>
          <a
            :href="`http://www.facebook.com/sharer.php?u=${link}`"
            title="Compartir en facebook"
            target="_blank"
            ><svg height="20" viewBox="0 0 448 512">
              <path
                fill="#fff"
                d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z"
              ></path>
            </svg>
          </a>
        </li>
        <li>
          <a target="_blank"
            :href="`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              texto
            )}&url=${link}&hashtags=${hashtags}`"
            title="Compartir en twitter"
            ><svg height="20" viewBox="0 0 14 12">
              <path
                fill="#fff"
                d="M13.5 2C13 2.2 12.5 2.3 12 2.4 12.5 2.1 12.9 1.5 13.1 0.9 12.6 1.2 12 1.4 11.4 1.6 11.2 1.3 10.9 1.1 10.6 0.9 10.2 0.8 9.9 0.7 9.5 0.7 8 0.7 6.8 1.9 6.8 3.4 6.8 3.6 6.9 3.8 6.9 4 4.7 3.9 2.7 2.8 1.4 1.2 1.2 1.6 1 2.1 1 2.6 1 3.5 1.5 4.3 2.2 4.8 1.8 4.8 1.4 4.6 1 4.4V4.5C1 5.8 1.9 6.8 3.2 7.1 2.9 7.1 2.7 7.2 2.5 7.2 2.3 7.2 2.1 7.2 2 7.1 2.3 8.2 3.3 9 4.5 9 3.5 9.7 2.4 10.1 1.1 10.1 0.9 10.1 0.7 10.1 0.5 10.1 1.7 10.8 3.1 11.3 4.6 11.3 9.5 11.3 12.2 7.2 12.2 3.7 12.2 3.6 12.2 3.5 12.2 3.4 12.7 3 13.1 2.5 13.5 2Z"
              ></path>
            </svg>
          </a>
        </li>
        <li>
          <a target="_blank"
            :href="`https://api.whatsapp.com/send?text=${encodeURIComponent(
              texto
            )} ${link}`"
            title="Compartir en WhatsApp"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              height="20"
              viewBox="0 0 16.411 16.411"
            >
              <defs>
                itemprop="url"

                <clipPath id="a">
                  <rect
                    width="16.411"
                    height="16.411"
                    transform="translate(112)"
                    fill="#fff"
                  ></rect>
                </clipPath>
              </defs>
              <g transform="translate(-112)">
                <path
                  fill="#fff"
                  d="M128.411,7.994a8.071,8.071,0,0,1-11.951,7L112,16.411l1.454-4.29A7.914,7.914,0,0,1,112.3,7.994a8.057,8.057,0,0,1,16.113,0Zm-8.057-6.719A6.754,6.754,0,0,0,113.581,8a6.648,6.648,0,0,0,1.29,3.94l-.846,2.5,2.6-.827A6.781,6.781,0,0,0,127.125,8a6.753,6.753,0,0,0-6.771-6.728Zm4.069,8.561c-.05-.081-.182-.13-.379-.229s-1.169-.572-1.349-.636-.314-.1-.445.1-.509.637-.625.769-.23.148-.428.051a5.441,5.441,0,0,1-1.589-.972,5.891,5.891,0,0,1-1.1-1.357c-.116-.2-.012-.3.086-.4s.2-.229.3-.344a1.306,1.306,0,0,0,.2-.326.361.361,0,0,0,.035-.174.365.365,0,0,0-.052-.17c-.049-.1-.444-1.062-.609-1.454s-.329-.327-.444-.327-.247-.016-.378-.016a.721.721,0,0,0-.526.244,2.194,2.194,0,0,0-.691,1.634,3.784,3.784,0,0,0,.806,2.027,8.088,8.088,0,0,0,3.374,2.958c2.008.784,2.008.522,2.37.489a1.991,1.991,0,0,0,1.333-.931A1.633,1.633,0,0,0,124.423,9.836Z"
                ></path>
              </g>
            </svg>
          </a>
        </li>
        <li>
          <a target="_blank"
            :href="`fb-messenger://share/?link=${link}`"
            title="Compartir en Messenger"
            ><svg height="20" viewBox="0 0 512 512">
              <path
                fill="#fff"
                d="M256.55 8C116.52 8 8 110.34 8 248.57c0 72.3 29.71 134.78 78.07 177.94 8.35 7.51 6.63 11.86 8.05 58.23A19.92 19.92 0 0 0 122 502.31c52.91-23.3 53.59-25.14 62.56-22.7C337.85 521.8 504 423.7 504 248.57 504 110.34 396.59 8 256.55 8zm149.24 185.13l-73 115.57a37.37 37.37 0 0 1-53.91 9.93l-58.08-43.47a15 15 0 0 0-18 0l-78.37 59.44c-10.46 7.93-24.16-4.6-17.11-15.67l73-115.57a37.36 37.36 0 0 1 53.91-9.93l58.06 43.46a15 15 0 0 0 18 0l78.41-59.38c10.44-7.98 24.14 4.54 17.09 15.62z"
              ></path>
            </svg>
          </a>
        </li>
        <li>
          <VTooltip :triggers="['hover', 'focus']" :placement="'left'">
            <button
              type="button"
              class="copiar"
              id="copy-link"
              @click="copiaTexto()"
            >
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path
                  fill="#fff"
                  d="M4.2 19.8C4.7 20.2 5.2 20.6 5.8 20.9 6.5 21.1 7.1 21.2 7.8 21.2 8.4 21.2 9.1 21.1 9.7 20.9 10.3 20.6 10.8 20.2 11.3 19.8L14.1 16.9 12.7 15.5 9.9 18.4C9.3 18.9 8.6 19.2 7.8 19.2 7 19.2 6.2 18.9 5.6 18.4 5.1 17.8 4.8 17 4.8 16.2 4.8 15.4 5.1 14.7 5.6 14.1L8.5 11.3 7.1 9.9 4.2 12.7C3.3 13.6 2.8 14.9 2.8 16.2 2.8 17.6 3.3 18.8 4.2 19.8V19.8ZM19.8 11.3C20.7 10.4 21.2 9.1 21.2 7.8 21.2 6.4 20.7 5.2 19.8 4.2 18.8 3.3 17.6 2.8 16.2 2.8 14.9 2.8 13.6 3.3 12.7 4.2L9.9 7.1 11.3 8.5 14.1 5.6C14.7 5.1 15.4 4.8 16.2 4.8 17 4.8 17.8 5.1 18.4 5.6 18.9 6.2 19.2 7 19.2 7.8 19.2 8.6 18.9 9.3 18.4 9.9L15.5 12.7 16.9 14.1 19.8 11.3Z"
                ></path>
                <path
                  fill="#fff"
                  d="M8.5 17L7 15.5 15.5 7.1 17 8.5 8.5 17Z"
                ></path>
              </svg>
            </button>
            <template #popper>
                {{ enlace_copiado ? "Copiado": "Copiar enlace" }}
            </template>
          </VTooltip>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script setup>
import {ref} from "vue"
const props = defineProps({
  link: {
    type: String,
    default:
      "https://interactivos.eluniversal.com.mx/2023/abuso-sexual-escuelas",
  },
  texto: {
    type: String,
    default: "Maestros abusadores",
  },
  hashtags: {
    type: String,
    default: "Maestrosabusadores",
  },
  
});
const enlace_copiado = ref(false)
function copiaTexto() {
  enlace_copiado.value = true

  navigator.clipboard.writeText(props.link);

}
</script>
<style lang="scss" scoped>
div.compartidera {
  position: fixed;
  z-index: 10;
  bottom: 8px;
  right: 8px;
  width: 20px;
  background: $color-fondo-oscuro-transparencia;
  border-radius: $radio-borde;
  padding: 8px;
  ul {
    list-style-type: none;
    padding: 0;
    margin: 8px 0;
    button {
      background: transparent;
      border: none;
      padding: 0;
      cursor: pointer;
    }
  }
}
</style>