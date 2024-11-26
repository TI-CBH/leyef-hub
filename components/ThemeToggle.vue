<template>
  <button
    @click="toggleColorMode"
    class="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700"
  >
    <sun-icon v-if="colorMode.value === 'dark'" class="h-5 w-5" />
    <moon-icon v-else class="h-5 w-5" />
  </button>
</template>

<script setup lang="ts">
import { SunIcon, MoonIcon } from '@heroicons/vue/24/outline/index.js'
const colorMode = useColorMode()

const toggleColorMode = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script> 