<template>
  <Modal @close="$emit('close')">
    <div class="p-6">
      <h2 class="text-xl font-semibold mb-4">
        {{ isEditing ? 'Edit Project' : 'New Project' }}
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

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium mb-1">
              Status
            </label>
            <select
              v-model="form.status"
              required
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            >
              <option value="planning">Planning</option>
              <option value="in-progress">In Progress</option>
              <option value="review">Review</option>
              <option value="completed">Completed</option>
            </select>
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
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">
            Due Date
          </label>
          <input
            v-model="form.due_date"
            type="date"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          />
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
            {{ isEditing ? 'Update' : 'Create' }}
          </button>
        </div>
      </form>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import type { Project } from '~/types'
import { PencilIcon, TrashIcon } from '@heroicons/vue/24/outline/index.js'

const props = defineProps<{
  project?: Project
}>()

const isEditing = computed(() => !!props.project)

const form = reactive({
  title: props.project?.title || '',
  description: props.project?.description || '',
  status: props.project?.status || 'planning',
  priority: props.project?.priority || 'medium',
  due_date: props.project?.due_date || ''
})

const handleSubmit = () => {
  emit('submit', { ...form })
}

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'submit', project: Omit<Project, 'id' | 'created_at' | 'updated_at' | 'tasks'>): void
}>()
</script> 