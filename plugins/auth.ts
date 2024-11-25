import { defineNuxtPlugin } from '#app'
import { useAuth } from '~/composables/useAuth'

export default defineNuxtPlugin((nuxtApp) => {
  const auth = useAuth()
  
  // Initialize auth on client-side only
  if (process.client) {
    auth.init()
  }
}) 