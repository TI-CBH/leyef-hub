<template>
  <div class="flex justify-center items-center h-screen">
    <LoadingSpinner />
  </div>
</template>

<script setup lang="ts">
// Redirect to dashboard
onMounted(() => {
  navigateTo('/dashboard')
})
</script>