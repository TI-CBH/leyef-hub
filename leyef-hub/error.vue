<template>
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-r from-mint to-modern-blue">
      <div class="text-center">
        <h1 class="text-9xl font-bold text-white mb-4">{{ error.statusCode }}</h1>
        <p class="text-xl text-white mb-8">{{ error.message || 'Page not found' }}</p>
        <button 
          @click="handleError"
          class="bg-white text-modern-blue px-6 py-3 rounded-lg shadow-lg hover:bg-opacity-90 transition-all"
        >
          Back to Home
        </button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  const props = defineProps({
    error: Object
  })
  
  const handleError = () => {
    clearError()
    navigateTo('/')
  }
  </script>