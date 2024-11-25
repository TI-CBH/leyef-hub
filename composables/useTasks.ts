import { defineStore } from 'pinia'
import type { Task } from '~/types'

interface TasksState {
  tasks: Task[]
  isLoading: boolean
}

export const useTasks = defineStore('tasks', {
  state: (): TasksState => ({
    tasks: [],
    isLoading: false
  }),

  getters: {
    getTasksByHub: (state) => (hubId: string) => {
      return state.tasks.filter((task: Task) => task.hub_id === hubId)
    },
    
    getTasksByPriority: (state) => (priority: Task['priority']) => {
      return state.tasks.filter((task: Task) => task.priority === priority)
    },
    
    getCompletedTasks: (state) => {
      return state.tasks.filter((task: Task) => task.completed)
    }
  },

  actions: {
    async fetchTasks() {
      this.isLoading = true
      try {
        // TODO: Implement FaunaDB query
        // const result = await queryTasks()
        // this.tasks = result.data
      } catch (error) {
        console.error('Error fetching tasks:', error)
      } finally {
        this.isLoading = false
      }
    },

    async addTask(task: Omit<Task, 'id' | 'created_at' | 'updated_at'>) {
      this.isLoading = true
      try {
        // TODO: Implement FaunaDB mutation
        // const result = await createTask(task)
        // this.tasks.push(result.data)
      } catch (error) {
        console.error('Error adding task:', error)
      } finally {
        this.isLoading = false
      }
    },

    async updateTask(id: string, updates: Partial<Task>) {
      this.isLoading = true
      try {
        // TODO: Implement FaunaDB mutation
        // const result = await updateTask(id, updates)
        const index = this.tasks.findIndex((task: Task) => task.id === id)
        if (index !== -1) {
          this.tasks[index] = { ...this.tasks[index], ...updates }
        }
      } catch (error) {
        console.error('Error updating task:', error)
      } finally {
        this.isLoading = false
      }
    },

    async deleteTask(id: string) {
      this.isLoading = true
      try {
        // TODO: Implement FaunaDB mutation
        // await deleteTask(id)
        this.tasks = this.tasks.filter((task: Task) => task.id !== id)
      } catch (error) {
        console.error('Error deleting task:', error)
      } finally {
        this.isLoading = false
      }
    }
  }
}) 