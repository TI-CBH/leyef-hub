<template>
  <div class="bg-white dark:bg-neutral-800 rounded-lg shadow p-6">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-lg font-semibold">Upcoming Meetings</h2>
      <button
        @click="$emit('add')"
        class="text-primary hover:text-primary-dark"
      >
        <PlusIcon class="w-5 h-5" />
      </button>
    </div>

    <div v-if="loading" class="flex justify-center py-8">
      <LoadingSpinner />
    </div>

    <div v-else-if="meetings.length === 0" class="text-center py-8">
      <p class="text-neutral-500 dark:text-neutral-400">No meetings scheduled</p>
    </div>

    <div v-else class="space-y-4">
      <div
        v-for="meeting in sortedMeetings"
        :key="meeting.id"
        class="bg-neutral-50 dark:bg-neutral-700 p-4 rounded-lg"
      >
        <div class="flex justify-between items-start">
          <div>
            <h3 class="font-medium">{{ meeting.title }}</h3>
            <p v-if="meeting.description" class="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
              {{ meeting.description }}
            </p>
          </div>
          <div class="flex items-center space-x-2">
            <button
              @click="$emit('edit', meeting)"
              class="text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
            >
              <PencilIcon class="w-4 h-4" />
            </button>
            <button
              @click="$emit('delete', meeting)"
              class="text-red-500 hover:text-red-600"
            >
              <TrashIcon class="w-4 h-4" />
            </button>
          </div>
        </div>

        <div class="mt-4 flex items-center justify-between text-sm">
          <div class="flex items-center text-neutral-500 dark:text-neutral-400">
            <ClockIcon class="w-4 h-4 mr-1" />
            <span>{{ formatDateTime(meeting.start_date) }}</span>
          </div>
          <div class="flex items-center text-neutral-500 dark:text-neutral-400">
            <UsersIcon class="w-4 h-4 mr-1" />
            <span>{{ meeting.attendees?.length || 0 }} attendees</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon, 
  ClockIcon, 
  UsersIcon 
} from '@heroicons/vue/24/outline/index.js'
import type { Meeting } from '~/types'

const props = defineProps<{
  meetings: Meeting[]
  loading?: boolean
}>()

defineEmits<{
  (e: 'add'): void
  (e: 'edit', meeting: Meeting): void
  (e: 'delete', meeting: Meeting): void
}>()

const sortedMeetings = computed(() => {
  return [...props.meetings].sort((a, b) => 
    new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
  )
})

const formatDateTime = (date: string) => {
  return new Date(date).toLocaleString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  })
}
</script> 