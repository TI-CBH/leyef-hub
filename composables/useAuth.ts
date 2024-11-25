import { defineStore } from 'pinia'
import netlifyIdentity from 'netlify-identity-widget'

export const useAuth = defineStore('auth', {
  state: () => ({
    user: null as netlifyIdentity.User | null,
    isAuthenticated: false,
    isLoading: true
  }),

  actions: {
    init() {
      netlifyIdentity.init({
        APIUrl: `${process.env.NUXT_PUBLIC_SITE_URL}/.netlify/identity`
      })

      netlifyIdentity.on('login', (user) => {
        this.user = user
        this.isAuthenticated = true
        netlifyIdentity.close()
      })

      netlifyIdentity.on('logout', () => {
        this.user = null
        this.isAuthenticated = false
      })

      // Check initial state
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