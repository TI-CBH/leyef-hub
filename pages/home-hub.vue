<template>
  <div class="space-y-8">
    <header class="flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold text-neutral-900 dark:text-white">
          Home Hub
        </h1>
        <p class="text-neutral-500 dark:text-neutral-400">
          Manage your household tasks and family activities
        </p>
      </div>
      
      <button
        @click="showNewTaskModal = true"
        class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
      >
        <PlusIcon class="w-5 h-5 inline-block mr-2" />
        New Task
      </button>
    </header>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Tasks Section -->
      <div class="space-y-6">
        <TaskList
          title="Household Tasks"
          :tasks="homeTasks"
          :loading="tasksStore.isLoading"
          @add="showNewTaskModal = true"
          @toggle="toggleTask"
          @delete="deleteTask"
        />
      </div>

      <!-- Calendar Section -->
      <div class="bg-white dark:bg-neutral-800 rounded-lg shadow p-6">
        <h2 class="text-lg font-semibold mb-4">
          Family Calendar
        </h2>
        <!-- TODO: Implement calendar component -->
      </div>
    </div>

    <!-- New Task Modal -->
    <TaskFormModal
      v-if="showNewTaskModal"
      @close="showNewTaskModal = false"
      @submit="createTask"
    />
  </div>
</template>

<script setup lang="ts">
import { PlusIcon } from '@heroicons/vue/outline'
import { useTasks } from '~/composables/useTasks'
import type { Task } from '~/types'

// Store
const tasksStore = useTasks()

// State
const showNewTaskModal = ref(false)

// Computed
const homeTasks = computed(() => {
  return tasksStore.getTasksByHub('home')
})

// Methods
const createTask = async (taskData: Omit<Task, 'id' | 'created_at' | 'updated_at'>) => {
  await tasksStore.addTask({
    ...taskData,
    hub_id: 'home'
  })
  showNewTaskModal.value = false
}

const toggleTask = async (task: Task) => {
  await tasksStore.updateTask(task.id, {
    completed: !task.completed
  })
}

const deleteTask = async (task: Task) => {
  if (confirm('Are you sure you want to delete this task?')) {
    await tasksStore.deleteTask(task.id)
  }
}

// Fetch tasks on mount
onMounted(() => {
  tasksStore.fetchTasks()
})
</script> 