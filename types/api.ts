import type { Task, Note } from '~/types'

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

export interface DeleteResponse {
  success: boolean
} 