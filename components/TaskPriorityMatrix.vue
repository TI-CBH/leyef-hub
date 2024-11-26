<template>
  <div class="bg-white dark:bg-neutral-800 rounded-lg shadow p-6">
    <h2 class="text-lg font-semibold mb-4">Priority Matrix</h2>
    
    <div class="grid grid-cols-2 gap-4">
      <!-- Urgent & Important -->
      <div class="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
        <h3 class="font-medium text-red-700 dark:text-red-300 mb-2">
          Urgent & Important
        </h3>
        <ul class="space-y-2">
          <li 
            v-for="task in urgentImportant" 
            :key="task.id"
            class="bg-white dark:bg-neutral-800 p-2 rounded shadow-sm"
          >
            <div class="flex items-center">
              <input
                type="checkbox"
                :checked="task.completed"
                @change="$emit('toggle', task)"
                class="h-4 w-4 text-primary"
              />
              <span class="ml-2" :class="{ 'line-through': task.completed }">
                {{ task.title }}
              </span>
            </div>
          </li>
        </ul>
      </div>

      <!-- Important, Not Urgent -->
      <div class="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
        <h3 class="font-medium text-yellow-700 dark:text-yellow-300 mb-2">
          Important, Not Urgent
        </h3>
        <ul class="space-y-2">
          <li 
            v-for="task in importantNotUrgent" 
            :key="task.id"
            class="bg-white dark:bg-neutral-800 p-2 rounded shadow-sm"
          >
            <div class="flex items-center">
              <input
                type="checkbox"
                :checked="task.completed"
                @change="$emit('toggle', task)"
                class="h-4 w-4 text-primary"
              />
              <span class="ml-2" :class="{ 'line-through': task.completed }">
                {{ task.title }}
              </span>
            </div>
          </li>
        </ul>
      </div>

      <!-- Urgent, Not Important -->
      <div class="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
        <h3 class="font-medium text-orange-700 dark:text-orange-300 mb-2">
          Urgent, Not Important
        </h3>
        <ul class="space-y-2">
          <li 
            v-for="task in urgentNotImportant" 
            :key="task.id"
            class="bg-white dark:bg-neutral-800 p-2 rounded shadow-sm"
          >
            <div class="flex items-center">
              <input
                type="checkbox"
                :checked="task.completed"
                @change="$emit('toggle', task)"
                class="h-4 w-4 text-primary"
              />
              <span class="ml-2" :class="{ 'line-through': task.completed }">
                {{ task.title }}
              </span>
            </div>
          </li>
        </ul>
      </div>

      <!-- Neither Urgent nor Important -->
      <div class="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
        <h3 class="font-medium text-green-700 dark:text-green-300 mb-2">
          Neither Urgent nor Important
        </h3>
        <ul class="space-y-2">
          <li 
            v-for="task in neitherUrgentImportant" 
            :key="task.id"
            class="bg-white dark:bg-neutral-800 p-2 rounded shadow-sm"
          >
            <div class="flex items-center">
              <input
                type="checkbox"
                :checked="task.completed"
                @change="$emit('toggle', task)"
                class="h-4 w-4 text-primary"
              />
              <span class="ml-2" :class="{ 'line-through': task.completed }">
                {{ task.title }}
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Task } from '~/types'
import { CheckCircleIcon } from '@heroicons/vue/24/outline/index.js'

const props = defineProps<{
  tasks: Task[]
}>()

defineEmits<{
  (e: 'toggle', task: Task): void
}>()

// Sort tasks by priority and due date
const urgentImportant = computed(() => 
  props.tasks.filter(task => 
    task.priority === 'high' && 
    !task.completed &&
    task.due_date && 
    new Date(task.due_date) <= new Date(Date.now() + 24 * 60 * 60 * 1000)
  )
)

const importantNotUrgent = computed(() => 
  props.tasks.filter(task => 
    task.priority === 'high' && 
    !task.completed &&
    (!task.due_date || new Date(task.due_date) > new Date(Date.now() + 24 * 60 * 60 * 1000))
  )
)

const urgentNotImportant = computed(() => 
  props.tasks.filter(task => 
    task.priority === 'medium' && 
    !task.completed &&
    task.due_date && 
    new Date(task.due_date) <= new Date(Date.now() + 24 * 60 * 60 * 1000)
  )
)

const neitherUrgentImportant = computed(() => 
  props.tasks.filter(task => 
    task.priority === 'low' && 
    !task.completed
  )
)
</script> 