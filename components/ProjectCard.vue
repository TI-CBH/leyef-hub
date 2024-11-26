<template>
  <div 
    class="bg-white dark:bg-neutral-800 rounded-lg shadow p-4 cursor-pointer hover:shadow-md transition-shadow"
    @click="$emit('click', project)"
  >
    <div class="flex items-start justify-between">
      <div>
        <h4 class="font-medium text-neutral-900 dark:text-white">
          {{ project.title }}
        </h4>
        <p v-if="project.description" class="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2 mt-1">
          {{ project.description }}
        </p>
      </div>
      <TaskPriorityBadge :priority="project.priority" />
    </div>

    <div class="mt-4 flex items-center justify-between text-sm">
      <div class="flex items-center text-neutral-500 dark:text-neutral-400">
        <ClockIcon class="w-4 h-4 mr-1" />
        <span>{{ formattedDueDate }}</span>
      </div>
      <div class="flex items-center text-neutral-500 dark:text-neutral-400">
        <CheckCircleIcon class="w-4 h-4 mr-1" />
        <span>{{ completedTasks }}/{{ totalTasks }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import pkg from '@heroicons/vue/24/outline'
const { ClockIcon, CheckCircleIcon } = pkg
import type { Project } from '~/types'
import { useTasks } from '~/composables/useTasks'

const props = defineProps<{
  project: Project
}>()

defineEmits<{
  (e: 'click', project: Project): void
}>()

const tasksStore = useTasks()

// Format due date
const formattedDueDate = computed(() => {
  if (!props.project.due_date) return 'No due date'
  return new Date(props.project.due_date).toLocaleDateString()
})

// Calculate task completion
const totalTasks = computed(() => props.project.tasks?.length || 0)
const completedTasks = computed(() => {
  if (!props.project.tasks?.length) return 0
  return tasksStore.tasks
    .filter(task => props.project.tasks?.includes(task.id))
    .filter(task => task.completed)
    .length
})
</script> 