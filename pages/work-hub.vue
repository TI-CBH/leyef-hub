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
      
      <div class="flex gap-4">
        <button
          @click="showNewTaskModal = true"
          class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
        >
          <PlusIcon class="w-5 h-5 inline-block mr-2" />
          New Task
        </button>
        <button
          @click="showProjectModal = true"
          class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
        >
          <FolderPlusIcon class="w-5 h-5 inline-block mr-2" />
          New Project
        </button>
      </div>
    </header>

    <!-- Project Board -->
    <ProjectBoard
      :projects="projects"
      @add="showProjectModal = true"
      @edit="editProject"
    />

    <!-- Task Priority Matrix -->
    <TaskPriorityMatrix
      :tasks="workTasks"
      @toggle="toggleTask"
    />

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

      <!-- Meeting Scheduler -->
      <div class="lg:col-span-2">
        <MeetingScheduler
          :meetings="meetings"
          :loading="meetingsStore.isLoading"
          @add="showMeetingModal = true"
          @edit="editMeeting"
          @delete="deleteMeeting"
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

    <!-- Project Modal -->
    <ProjectFormModal
      v-if="showProjectModal"
      :project="selectedProject"
      @close="closeProjectModal"
      @submit="submitProject"
    />

    <!-- Meeting Modal -->
    <MeetingFormModal
      v-if="showMeetingModal"
      :meeting="selectedMeeting"
      @close="closeMeetingModal"
      @submit="submitMeeting"
    />
  </div>
</template>

<script setup lang="ts">
import { PlusIcon, FolderPlusIcon } from '@heroicons/vue/24/outline'
import { useTasks } from '~/composables/useTasks'
import { useNotes } from '~/composables/useNotes'
import { useProjects } from '~/composables/useProjects'
import { useMeetings } from '~/composables/useMeetings'
import type { Task, Note, Project, Meeting } from '~/types'

// Stores
const tasksStore = useTasks()
const notesStore = useNotes()
const projectsStore = useProjects()
const meetingsStore = useMeetings()

// State
const showNewTaskModal = ref(false)
const showNoteModal = ref(false)
const showProjectModal = ref(false)
const showMeetingModal = ref(false)
const selectedNote = ref<Note | undefined>(undefined)
const selectedProject = ref<Project | undefined>(undefined)
const selectedMeeting = ref<Meeting | undefined>(undefined)

// Computed
const workTasks = computed(() => {
  return tasksStore.getTasksByHub('work')
})

const workNotes = computed(() => {
  return notesStore.getNotesByHub('work')
})

const projects = computed(() => {
  return projectsStore.projects
})

const meetings = computed(() => {
  return meetingsStore.getUpcomingMeetings
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

// Project Methods
const editProject = (project: Project) => {
  selectedProject.value = project
  showProjectModal.value = true
}

const closeProjectModal = () => {
  selectedProject.value = undefined
  showProjectModal.value = false
}

const submitProject = async (projectData: Omit<Project, 'id' | 'created_at' | 'updated_at' | 'tasks'>) => {
  if (selectedProject.value) {
    await projectsStore.updateProject(selectedProject.value.id, projectData)
  } else {
    await projectsStore.addProject(projectData)
  }
  closeProjectModal()
}

// Meeting Methods
const editMeeting = (meeting: Meeting) => {
  selectedMeeting.value = meeting
  showMeetingModal.value = true
}

const closeMeetingModal = () => {
  selectedMeeting.value = undefined
  showMeetingModal.value = false
}

const submitMeeting = async (meetingData: Omit<Meeting, 'id' | 'created_at' | 'updated_at'>) => {
  if (selectedMeeting.value) {
    await meetingsStore.updateMeeting(selectedMeeting.value.id, meetingData)
  } else {
    await meetingsStore.addMeeting(meetingData)
  }
  closeMeetingModal()
}

const deleteMeeting = async (meeting: Meeting) => {
  if (confirm('Are you sure you want to delete this meeting?')) {
    await meetingsStore.deleteMeeting(meeting.id)
  }
}

// Fetch data on mount
onMounted(() => {
  tasksStore.fetchTasks()
  notesStore.fetchNotes()
  projectsStore.fetchProjects()
  meetingsStore.fetchMeetings()
})
</script> 