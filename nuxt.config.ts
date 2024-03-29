// https://nuxt.com/docs/api/configuration/nuxt-config
import glsl from 'vite-plugin-glsl'

export default defineNuxtConfig({
  ssr:true,
  generate: {
    minify: false
  },
  app: {
    baseURL: '/2023/abuso-sexual-escuelas/',
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      htmlAttrs: {
        lang: 'es-mx'
      }
    }
  },
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
    },
    modules:[
      'floating-vue/nuxt',
      ['@nuxtjs/google-fonts', {
        families: {
          'Roboto+Mono': true,
          download: true,
          inject: true
        }
      }]
    ],
    googleFonts: {
      families: {
        'Roboto+Slab': [400, 700],
        'Open+Sans': true,
        download: true,
        inject: true
      }
    }
    
  })