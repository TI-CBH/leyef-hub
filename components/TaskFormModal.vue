<template>
  <Modal @close="$emit('close')">
    <div class="p-6">
      <h2 class="text-xl font-semibold mb-4">
        New Task
      </h2>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1">
            Title
          </label>
          <input
            v-model="form.title"
            type="text"
            required
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">
            Description
          </label>
          <textarea
            v-model="form.description"
            rows="3"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">
            Priority
          </label>
          <select
            v-model="form.priority"
            required
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div class="flex justify-end space-x-4">
          <button
            type="button"
            @click="$emit('close')"
            class="px-4 py-2 text-neutral-700 hover:text-neutral-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
          >
            Create Task
          </button>
        </div>
      </form>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import type { Task } from '~/types'

const form = reactive({
  title: '',
  description: '',
  priority: 'medium' as Task['priority'],
  completed: false
})

const handleSubmit = () => {
  emit('submit', { ...form })
}

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'submit', task: Omit<Task, 'id' | 'created_at' | 'updated_at'>): void
}>()
</script> 