import { defineNuxtPlugin } from 'nuxt/app'
import { useAuth } from '~/composables/useAuth'

export default defineNuxtPlugin(() => {
  const auth = useAuth()
  
  // Initialize auth on client-side only
  if (process.client) {
    auth.init()
  }
}) 