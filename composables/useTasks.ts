import { defineStore } from 'pinia'
import type { Task } from '~/types'
import { taskQueries } from '~/utils/fauna'

interface TasksState {
  tasks: Task[]
  isLoading: boolean
  error: string | null
}

export const useTasks = defineStore('tasks', {
  state: (): TasksState => ({
    tasks: [],
    isLoading: false,
    error: null
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
      this.error = null
      try {
        const tasks = await taskQueries.getAllTasks()
        this.tasks = tasks
      } catch (error) {
        console.error('Error fetching tasks:', error)
        this.error = 'Failed to fetch tasks'
      } finally {
        this.isLoading = false
      }
    },

    async addTask(task: Omit<Task, 'id' | 'created_at' | 'updated_at'>) {
      this.isLoading = true
      this.error = null
      try {
        const newTask = await taskQueries.createTask(task)
        this.tasks.push(newTask)
      } catch (error) {
        console.error('Error adding task:', error)
        this.error = 'Failed to add task'
      } finally {
        this.isLoading = false
      }
    },

    async updateTask(id: string, updates: Partial<Task>) {
      this.isLoading = true
      this.error = null
      try {
        const updatedTask = await taskQueries.updateTask(id, updates)
        const index = this.tasks.findIndex((task: Task) => task.id === id)
        if (index !== -1) {
          this.tasks[index] = updatedTask
        }
      } catch (error) {
        console.error('Error updating task:', error)
        this.error = 'Failed to update task'
      } finally {
        this.isLoading = false
      }
    },

    async deleteTask(id: string) {
      this.isLoading = true
      this.error = null
      try {
        await taskQueries.deleteTask(id)
        this.tasks = this.tasks.filter((task: Task) => task.id !== id)
      } catch (error) {
        console.error('Error deleting task:', error)
        this.error = 'Failed to delete task'
      } finally {
        this.isLoading = false
      }
    }
  }
}) 