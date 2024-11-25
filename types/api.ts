import type { Task, Note, Project } from '~/types'

export interface ApiResponse<T> {
  data: T
  error?: string
}

export interface TasksResponse {
  tasks: Task[]
}

export interface TaskResponse {
  task: Task
}

export interface NotesResponse {
  notes: Note[]
}

export interface NoteResponse {
  note: Note
}

export interface ProjectsResponse {
  projects: Project[]
}

export interface ProjectResponse {
  project: Project
}

export interface DeleteResponse {
  success: boolean
} 