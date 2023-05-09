// https://nuxt.com/docs/api/configuration/nuxt-config
import glsl from 'vite-plugin-glsl'

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
      },
      plugins: [glsl()],

    },
    build: {
      transpile: [
        '@sindresorhus/slugify',
        '@sindresorhus/transliterate',
        'three',
        'd3',
        'internmap',
        'delaunator',
        'robust-predicates',
        'GLTFLoader',
      ],
      extend(config, ctx) {
        if (config.module) {
          config.module.rules.push({
            test: /\.(glsl)$/i,
            use: ['raw-loader'],
          })
        }
      },
    }
    
  })