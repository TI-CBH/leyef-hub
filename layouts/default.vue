<template>
  <div class="min-h-screen bg-background dark:bg-neutral-900">
    <nav-bar v-if="auth.isAuthenticated" />
    <main class="container mx-auto px-4 py-8">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
const auth = useAuth()
</script> 