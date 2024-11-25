import { defineStore } from 'pinia'
import * as netlifyIdentity from 'netlify-identity-widget'
import { useRuntimeConfig } from '#app'

interface AuthState {
  user: netlifyIdentity.User | null
  isAuthenticated: boolean
  isLoading: boolean
}

export const useAuth = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    isAuthenticated: false,
    isLoading: true
  }),

  actions: {
    init() {
      const config = useRuntimeConfig()
      const siteUrl = config.public.siteUrl
      
      netlifyIdentity.init({
        APIUrl: `${siteUrl}/.netlify/identity`
      })

      netlifyIdentity.on('login', (user) => {
        if (user) {
          this.user = user
          this.isAuthenticated = true
          netlifyIdentity.close()
        }
      })

      netlifyIdentity.on('logout', () => {
        this.user = null
        this.isAuthenticated = false
      })

      const currentUser = netlifyIdentity.currentUser()
      if (currentUser) {
        this.user = currentUser
        this.isAuthenticated = true
      }
      
      this.isLoading = false
    },

    login() {
      netlifyIdentity.open('login')
    },

    signup() {
      netlifyIdentity.open('signup')
    },

    logout() {
      netlifyIdentity.logout()
    }
  }
}) 