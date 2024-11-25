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

    <div v-else-if="notes.length === 0" class="text-center py-8">
      <p class="text-neutral-500 dark:text-neutral-400">No notes yet</p>
    </div>

    <TransitionGroup
      v-else
      name="list"
      tag="ul"
      class="space-y-4"
    >
      <li
        v-for="note in notes"
        :key="note.id"
        class="bg-white dark:bg-neutral-800 rounded-lg shadow p-4"
      >
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <h4 class="font-medium text-neutral-900 dark:text-white">
              {{ note.title }}
            </h4>
            <div class="flex items-center space-x-2">
              <button
                @click="$emit('edit', note)"
                class="text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
              >
                <PencilIcon class="w-4 h-4" />
              </button>
              <button
                @click="$emit('delete', note)"
                class="text-red-500 hover:text-red-600"
              >
                <TrashIcon class="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <p class="text-sm text-neutral-600 dark:text-neutral-300 line-clamp-3">
            {{ note.content }}
          </p>

          <div v-if="note.tags?.length" class="flex flex-wrap gap-2">
            <span
              v-for="tag in note.tags"
              :key="tag"
              class="px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </li>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/vue/outline'
import type { Note } from '~/types'

defineProps<{
  title: string
  notes: Note[]
  loading?: boolean
}>()

defineEmits<{
  (e: 'add'): void
  (e: 'edit', note: Note): void
  (e: 'delete', note: Note): void
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