import { defineNuxtPlugin } from '#app'
import type { NuxtApp } from '@nuxt/types'
import { useAuth } from '~/composables/useAuth'

export default defineNuxtPlugin((nuxtApp: NuxtApp) => {
  const auth = useAuth()
  
  // Initialize auth on client-side only
  if (typeof window !== 'undefined') {
    auth.init()
  }
}) 