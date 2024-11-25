// Import required types
import { defineNuxtConfig } from 'nuxt/config'
import type { NuxtConfig } from '@nuxt/types'

// Define config with proper typing
export default defineNuxtConfig({
  // SSG mode
  ssr: true,
  nitro: {
    preset: 'netlify'
  },

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
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
        }
      ]
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
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL,
      faunaKey: process.env.NUXT_PUBLIC_FAUNA_KEY
    }
  },

  // PWA Configuration
  pwa: {
    manifest: {
      name: 'Leyef Hub',
      short_name: 'Leyef',
      description: 'Personal life management dashboard',
      theme_color: '#3B82F6',
      background_color: '#F9FAFB'
    },
    workbox: {
      enabled: true
    }
  },

  // Add devDependencies for TypeScript support
  devDependencies: {
    '@types/node': '^18.0.0',
  }
}) as NuxtConfig 