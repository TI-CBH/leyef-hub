<template>
  <div 
    class="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
  >
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-xl font-semibold text-neutral-900 dark:text-white">
        {{ hub.title }}
      </h3>
      <component 
        :is="icons[hub.icon]" 
        class="w-6 h-6 text-primary"
        aria-hidden="true"
      />
    </div>

    <div class="grid grid-cols-3 gap-4 mb-4">
      <div class="text-center">
        <p class="text-2xl font-bold text-neutral-900 dark:text-white">
          {{ hub.stats.tasks }}
        </p>
        <p class="text-sm text-neutral-500 dark:text-neutral-400">Tasks</p>
      </div>
      <div class="text-center">
        <p class="text-2xl font-bold text-neutral-900 dark:text-white">
          {{ hub.stats.events }}
        </p>
        <p class="text-sm text-neutral-500 dark:text-neutral-400">Events</p>
      </div>
      <div class="text-center">
        <p class="text-2xl font-bold text-neutral-900 dark:text-white">
          {{ hub.stats.notes }}
        </p>
        <p class="text-sm text-neutral-500 dark:text-neutral-400">Notes</p>
      </div>
    </div>

    <NuxtLink
      :to="hub.path"
      class="block w-full text-center py-2 px-4 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
    >
      View Hub
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import {
  HomeIcon,
  BriefcaseIcon,
  ChartBarIcon
} from '@heroicons/vue/outline'
import type { Hub } from '~/types'

const icons = {
  HomeIcon,
  BriefcaseIcon,
  ChartBarIcon
}

defineProps<{
  hub: Hub
}>()
</script> 