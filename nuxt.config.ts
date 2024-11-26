// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    // Modules
    modules: [
      '@nuxtjs/tailwindcss',
      '@pinia/nuxt',
      '@vueuse/nuxt',
      '@nuxtjs/color-mode'
    ],
  
    // App Config
    app: {
      head: {
        title: 'Leyef Hub',
        meta: [
          { charset: 'utf-8' },
          { name: 'viewport', content: 'width=device-width, initial-scale=1' },
          { 
            hid: 'description', 
            name: 'description', 
            content: 'Personal life management dashboard'
          }
        ],
        link: [
          { 
            rel: 'icon', 
            type: 'image/x-icon', 
            href: '/favicon.ico'
          }
        ]
      },
      error: {
        statusCode: 500,
        message: 'Something went wrong'
      }
    },
  
    // Color Mode
    colorMode: {
      classSuffix: '',
      preference: 'system',
      fallback: 'light'
    },
  
    // Runtime Config
    runtimeConfig: {
      faunaKey: process.env.FAUNA_KEY,
      public: {
        siteUrl: process.env.NUXT_PUBLIC_SITE_URL || ''
      }
    },
  
    // Nitro Configuration
    nitro: {
      preset: 'netlify',
      prerender: {
        crawlLinks: true,
        routes: [
          '/',
          '/login',
          '/dashboard',
          '/home-hub',
          '/work-hub',
          '/business-hub'
        ]
      },
      static: {
        directory: '.output/public',
        serveFiles: true
      }
    },
  
    // Build Configuration
    build: {
      transpile: ['@heroicons/vue']
    },
  
    // SSR Configuration
    ssr: true,
  
    // Router Configuration
    routeRules: {
      '/': { ssr: true },
      '/login': { ssr: false },
      '/dashboard': { ssr: true },
      '/home-hub': { ssr: true },
      '/work-hub': { ssr: true },
      '/business-hub': { ssr: true }
    },
  
    // Add this section
    experimental: {
      payloadExtraction: false
    }
  })