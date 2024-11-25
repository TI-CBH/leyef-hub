<template>
  <span
    class="px-2 py-1 text-xs font-medium rounded-full"
    :class="priorityClasses[priority]"
  >
    {{ priority }}
  </span>
</template>

<script setup lang="ts">
import type { Task } from '~/types'

const props = defineProps<{
  priority: Task['priority']
}>()

const priorityClasses = {
  low: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
}
</script> 