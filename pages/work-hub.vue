<template>
  <div class="space-y-8">
    <header class="flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold text-neutral-900 dark:text-white">
          Work Hub
        </h1>
        <p class="text-neutral-500 dark:text-neutral-400">
          Manage your professional tasks and projects
        </p>
      </div>
    </header>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Tasks Section -->
      <div class="space-y-6">
        <TaskList
          title="Work Tasks"
          :tasks="workTasks"
          :loading="tasksStore.isLoading"
          @add="showNewTaskModal = true"
          @toggle="toggleTask"
          @delete="deleteTask"
        />
      </div>

      <!-- Notes Section -->
      <div class="space-y-6">
        <NoteList
          title="Work Notes"
          :notes="workNotes"
          :loading="notesStore.isLoading"
          @add="showNewNoteModal = true"
          @edit="editNote"
          @delete="deleteNote"
        />
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
const workTasks = computed(() => {
  return tasksStore.getTasksByHub('work')
})

const workNotes = computed(() => {
  return notesStore.getNotesByHub('work')
})

// Task Methods
const createTask = async (taskData: Omit<Task, 'id' | 'created_at' | 'updated_at'>) => {
  await tasksStore.addTask({
    ...taskData,
    hub_id: 'work'
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
      hub_id: 'work'
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