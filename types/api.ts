import type { Task } from './index'

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

export interface DeleteResponse {
  success: boolean
} 