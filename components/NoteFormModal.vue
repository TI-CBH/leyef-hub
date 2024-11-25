<template>
  <Modal @close="$emit('close')">
    <div class="p-6">
      <h2 class="text-xl font-semibold mb-4">
        {{ isEditing ? 'Edit Note' : 'New Note' }}
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
            Content
          </label>
          <textarea
            v-model="form.content"
            rows="6"
            required
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">
            Tags
          </label>
          <div class="flex flex-wrap gap-2 mb-2">
            <span
              v-for="tag in form.tags"
              :key="tag"
              class="px-2 py-1 text-sm rounded-full bg-primary/10 text-primary flex items-center gap-1"
            >
              {{ tag }}
              <button
                type="button"
                @click="removeTag(tag)"
                class="hover:text-primary-dark"
              >
                <XIcon class="w-4 h-4" />
              </button>
            </span>
          </div>
          <div class="flex gap-2">
            <input
              v-model="newTag"
              type="text"
              placeholder="Add a tag"
              class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              @keyup.enter.prevent="addTag"
            />
            <button
              type="button"
              @click="addTag"
              class="px-3 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
            >
              Add
            </button>
          </div>
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
import { XIcon } from '@heroicons/vue/outline'
import type { Note } from '~/types'

const props = defineProps<{
  note?: Note
}>()

const isEditing = computed(() => !!props.note)

const form = reactive({
  title: props.note?.title || '',
  content: props.note?.content || '',
  tags: [...(props.note?.tags || [])]
})

const newTag = ref('')

const addTag = () => {
  const tag = newTag.value.trim()
  if (tag && !form.tags.includes(tag)) {
    form.tags.push(tag)
    newTag.value = ''
  }
}

const removeTag = (tagToRemove: string) => {
  form.tags = form.tags.filter(tag => tag !== tagToRemove)
}

const handleSubmit = () => {
  emit('submit', { ...form })
}

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'submit', note: Omit<Note, 'id' | 'created_at' | 'updated_at' | 'hub_id'>): void
}>()
</script> 