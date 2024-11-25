<template>
  <div class="space-y-8">
    <h1 class="text-3xl font-bold text-neutral-800 dark:text-white">
      Welcome back, {{ auth.user?.user_metadata?.full_name }}
    </h1>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Hub Preview Cards -->
      <hub-preview-card
        v-for="hub in hubs"
        :key="hub.id"
        :hub="hub"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const auth = useAuth()

// Middleware
definePageMeta({
  middleware: ['auth']
})

const hubs = [
  {
    id: 'home',
    title: 'Home Hub',
    path: '/home-hub',
    icon: 'HomeIcon',
    stats: { tasks: 0, events: 0, notes: 0 }
  },
  {
    id: 'work',
    title: 'Work Hub',
    path: '/work-hub',
    icon: 'BriefcaseIcon',
    stats: { tasks: 0, events: 0, notes: 0 }
  },
  {
    id: 'business',
    title: 'Side Business Hub',
    path: '/business-hub',
    icon: 'ChartBarIcon',
    stats: { tasks: 0, events: 0, notes: 0 }
  }
]
</script> 