<template>
  <Modal @close="$emit('close')">
    <div class="p-6">
      <h2 class="text-xl font-semibold mb-4">
        {{ isEditing ? 'Edit Meeting' : 'New Meeting' }}
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
              Start Date & Time
            </label>
            <input
              v-model="form.start_date"
              type="datetime-local"
              required
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            />
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">
              End Date & Time
            </label>
            <input
              v-model="form.end_date"
              type="datetime-local"
              required
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">
            Location
          </label>
          <input
            v-model="form.location"
            type="text"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">
            Attendees
          </label>
          <div class="flex flex-wrap gap-2 mb-2">
            <span
              v-for="attendee in form.attendees"
              :key="attendee"
              class="px-2 py-1 text-sm rounded-full bg-primary/10 text-primary flex items-center gap-1"
            >
              {{ attendee }}
              <button
                type="button"
                @click="removeAttendee(attendee)"
                class="hover:text-primary-dark"
              >
                <XMarkIcon class="w-4 h-4" />
              </button>
            </span>
          </div>
          <div class="flex gap-2">
            <input
              v-model="newAttendee"
              type="email"
              placeholder="Add attendee email"
              class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              @keyup.enter.prevent="addAttendee"
            />
            <button
              type="button"
              @click="addAttendee"
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
import pkg from '@heroicons/vue/24/outline'
const { XMarkIcon } = pkg
import type { Meeting } from '~/types'

const props = defineProps<{
  meeting?: Meeting
}>()

const isEditing = computed(() => !!props.meeting)

const form = reactive({
  title: props.meeting?.title || '',
  description: props.meeting?.description || '',
  start_date: props.meeting?.start_date || '',
  end_date: props.meeting?.end_date || '',
  location: props.meeting?.location || '',
  attendees: [...(props.meeting?.attendees || [])]
})

const newAttendee = ref('')

const addAttendee = () => {
  const email = newAttendee.value.trim()
  if (email && !form.attendees.includes(email)) {
    form.attendees.push(email)
    newAttendee.value = ''
  }
}

const removeAttendee = (emailToRemove: string) => {
  form.attendees = form.attendees.filter(email => email !== emailToRemove)
}

const handleSubmit = () => {
  emit('submit', { ...form })
}

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'submit', meeting: Omit<Meeting, 'id' | 'created_at' | 'updated_at'>): void
}>()
</script> 