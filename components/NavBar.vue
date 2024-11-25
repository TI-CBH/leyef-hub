<template>
  <nav class="bg-white dark:bg-neutral-800 shadow-lg">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <NuxtLink to="/dashboard" class="text-2xl font-bold text-primary">
          Leyef Hub
        </NuxtLink>

        <!-- Navigation Links -->
        <div class="hidden md:flex space-x-8">
          <NuxtLink 
            v-for="link in navLinks" 
            :key="link.path"
            :to="link.path"
            class="text-neutral-600 hover:text-primary dark:text-neutral-200"
          >
            {{ link.name }}
          </NuxtLink>
        </div>

        <!-- User Menu -->
        <div class="flex items-center space-x-4">
          <theme-toggle />
          <user-menu />
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
const navLinks = [
  { name: 'Home Hub', path: '/home-hub' },
  { name: 'Work Hub', path: '/work-hub' },
  { name: 'Side Business', path: '/business-hub' },
]
</script> 