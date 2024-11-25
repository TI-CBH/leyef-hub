<template>
  <div class="space-y-8">
    <header class="flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold text-neutral-900 dark:text-white">
          Business Hub
        </h1>
        <p class="text-neutral-500 dark:text-neutral-400">
          Manage your side business operations and growth
        </p>
      </div>
    </header>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Tasks Section -->
      <div class="space-y-6">
        <TaskList
          title="Business Tasks"
          :tasks="businessTasks"
          :loading="tasksStore.isLoading"
          @add="showNewTaskModal = true"
          @toggle="toggleTask"
          @delete="deleteTask"
        />
      </div>

      <!-- Notes Section -->
      <div class="space-y-6">
        <NoteList
          title="Business Notes"
          :notes="businessNotes"
          :loading="notesStore.isLoading"
          @add="showNewNoteModal = true"
          @edit="editNote"
          @delete="deleteNote"
        />
      </div>

      <!-- Metrics Section -->
      <div class="lg:col-span-2">
        <div class="bg-white dark:bg-neutral-800 rounded-lg shadow p-6">
          <h2 class="text-lg font-semibold mb-4">Business Metrics</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-neutral-50 dark:bg-neutral-700 p-4 rounded-lg">
              <h3 class="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                Revenue
              </h3>
              <p class="text-2xl font-bold text-primary mt-1">
                $0.00
              </p>
              <span class="text-xs text-green-500">
                +0% from last month
              </span>
            </div>
            <div class="bg-neutral-50 dark:bg-neutral-700 p-4 rounded-lg">
              <h3 class="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                Active Projects
              </h3>
              <p class="text-2xl font-bold text-primary mt-1">
                0
              </p>
              <span class="text-xs text-neutral-500">
                Projects in progress
              </span>
            </div>
            <div class="bg-neutral-50 dark:bg-neutral-700 p-4 rounded-lg">
              <h3 class="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                Pending Tasks
              </h3>
              <p class="text-2xl font-bold text-primary mt-1">
                {{ pendingTasks }}
              </p>
              <span class="text-xs text-neutral-500">
                Tasks to complete
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Task Modal -->
    <TaskFormModal
      v-if="showNewTaskModal"
      @close="showNewTaskModal = false"
      @submit="createTask"
    />

    <!-- Note Modal -->
    <NoteFormModal
      v-if="showNoteModal"
      :note="selectedNote"
      @close="closeNoteModal"
      @submit="submitNote"
    />
  </div>
</template>

<script setup lang="ts">
import { useTasks } from '~/composables/useTasks'
import { useNotes } from '~/composables/useNotes'
import type { Task, Note } from '~/types'

// Stores
const tasksStore = useTasks()
const notesStore = useNotes()

// State
const showNewTaskModal = ref(false)
const showNoteModal = ref(false)
const selectedNote = ref<Note | undefined>(undefined)

// Computed
const businessTasks = computed(() => {
  return tasksStore.getTasksByHub('business')
})

const businessNotes = computed(() => {
  return notesStore.getNotesByHub('business')
})

const pendingTasks = computed(() => {
  return businessTasks.value.filter(task => !task.completed).length
})

// Task Methods
const createTask = async (taskData: Omit<Task, 'id' | 'created_at' | 'updated_at'>) => {
  await tasksStore.addTask({
    ...taskData,
    hub_id: 'business'
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

// Note Methods
const editNote = (note: Note) => {
  selectedNote.value = note
  showNoteModal.value = true
}

const closeNoteModal = () => {
  selectedNote.value = undefined
  showNoteModal.value = false
}

const submitNote = async (noteData: Omit<Note, 'id' | 'created_at' | 'updated_at' | 'hub_id'>) => {
  if (selectedNote.value) {
    await notesStore.updateNote(selectedNote.value.id, noteData)
  } else {
    await notesStore.addNote({
      ...noteData,
      hub_id: 'business'
    })
  }
  closeNoteModal()
}

const deleteNote = async (note: Note) => {
  if (confirm('Are you sure you want to delete this note?')) {
    await notesStore.deleteNote(note.id)
  }
}

// Fetch data on mount
onMounted(() => {
  tasksStore.fetchTasks()
  notesStore.fetchNotes()
})
</script> 