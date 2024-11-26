<template>
  <div class="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-neutral-900 dark:text-white">
          Welcome to Leyef Hub
        </h2>
        <p class="mt-2 text-center text-sm text-neutral-600 dark:text-neutral-400">
          Your personal life management dashboard
        </p>
      </div>
      <div class="mt-8 space-y-6">
        <button
          @click="auth.login()"
          class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Sign in / Sign up
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const auth = useAuth()

// Redirect if already logged in
if (auth.isAuthenticated) {
  navigateTo('/dashboard')
}
</script> 