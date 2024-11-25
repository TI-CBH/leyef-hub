<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <h3 class="text-lg font-semibold text-neutral-900 dark:text-white">
        {{ title }}
      </h3>
      <button
        @click="$emit('add')"
        class="text-primary hover:text-primary-dark"
      >
        <PlusIcon class="w-5 h-5" />
      </button>
    </div>

    <div v-if="loading" class="flex justify-center">
      <LoadingSpinner />
    </div>

    <div v-else-if="tasks.length === 0" class="text-center py-8">
      <p class="text-neutral-500 dark:text-neutral-400">No tasks yet</p>
    </div>

    <TransitionGroup
      v-else
      name="list"
      tag="ul"
      class="space-y-2"
    >
      <li
        v-for="task in tasks"
        :key="task.id"
        class="bg-white dark:bg-neutral-800 rounded-lg shadow p-4"
      >
        <div class="flex items-center gap-4">
          <input
            type="checkbox"
            :checked="task.completed"
            @change="$emit('toggle', task)"
            class="h-4 w-4 text-primary"
          />
          <div class="flex-1">
            <p :class="{ 'line-through': task.completed }">
              {{ task.title }}
            </p>
            <p v-if="task.description" class="text-sm text-neutral-500 dark:text-neutral-400">
              {{ task.description }}
            </p>
          </div>
          <TaskPriorityBadge :priority="task.priority" />
          <button
            @click="$emit('delete', task)"
            class="text-red-500 hover:text-red-600"
          >
            <TrashIcon class="w-4 h-4" />
          </button>
        </div>
      </li>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { PlusIcon, TrashIcon } from '@heroicons/vue/outline'
import type { Task } from '~/types'

defineProps<{
  title: string
  tasks: Task[]
  loading?: boolean
}>()

defineEmits<{
  (e: 'add'): void
  (e: 'toggle', task: Task): void
  (e: 'delete', task: Task): void
}>()
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style> 