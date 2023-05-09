// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    typescript: {
      shim: false
    },
    css: [
      "~/assets/style/main.scss"
    ],
    vite: {
      css: {
        preprocessorOptions: {
          scss: {
            additionalData: '@use "@/assets/style/_variables.scss" as *;'
          }
        }
      }
    }
    
  })