<template>
  <div>
    <NuxtLayout>
      <NuxtLoadingIndicator />
      <NuxtErrorBoundary>
        <template #error="{ error }">
          <div class="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 class="text-2xl font-bold text-red-600 mb-4">
              {{ error.message }}
            </h1>
            <button
              class="px-4 py-2 bg-primary text-white rounded"
              @click="error.value = null"
            >
              Try again
            </button>
          </div>
        </template>
        <NuxtPage />
      </NuxtErrorBoundary>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
// Force authentication on all routes except login
const auth = useAuth()

onMounted(() => {
  // Initialize auth
  if (process.client) {
    auth.init()
  }
})

// Redirect to login if not authenticated
watchEffect(() => {
  if (process.client && !auth.isLoading && !auth.isAuthenticated) {
    navigateTo('/login')
  }
})

// Add error logging
onErrorCaptured((err) => {
  console.error('Error captured in app.vue:', err)
  return false
})
</script>