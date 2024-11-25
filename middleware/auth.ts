import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app'
import type { RouteLocationNormalized } from 'vue-router'
import { useAuth } from '~/composables/useAuth'

export default defineNuxtRouteMiddleware(
  (to: RouteLocationNormalized) => {
    const auth = useAuth()
    
    if (!auth.isAuthenticated && to.path !== '/login') {
      return navigateTo('/login')
    }
    
    if (auth.isAuthenticated && to.path === '/login') {
      return navigateTo('/dashboard')
    }
  }
) 