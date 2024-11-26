<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
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
</script>