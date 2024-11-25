import { defineStore } from 'pinia'
import type { Project } from '~/types'

interface ProjectsState {
  projects: Project[]
  isLoading: boolean
  error: string | null
}

export const useProjects = defineStore('projects', {
  state: (): ProjectsState => ({
    projects: [],
    isLoading: false,
    error: null
  }),

  getters: {
    getProjectsByStatus: (state) => (status: Project['status']) => {
      return state.projects.filter((project: Project) => project.status === status)
    }
  },

  actions: {
    async fetchProjects() {
      this.isLoading = true
      this.error = null
      try {
        const response = await $fetch<{ projects: Project[] }>('/api/projects')
        this.projects = response.projects
      } catch (error) {
        console.error('Error fetching projects:', error)
        this.error = 'Failed to fetch projects'
      } finally {
        this.isLoading = false
      }
    },

    async addProject(project: Omit<Project, 'id' | 'created_at' | 'updated_at'>) {
      this.isLoading = true
      this.error = null
      try {
        const response = await $fetch<{ project: Project }>('/api/projects/create', {
          method: 'POST',
          body: project
        })
        this.projects.push(response.project)
      } catch (error) {
        console.error('Error adding project:', error)
        this.error = 'Failed to add project'
      } finally {
        this.isLoading = false
      }
    },

    async updateProject(id: string, updates: Partial<Project>) {
      this.isLoading = true
      this.error = null
      try {
        const response = await $fetch<{ project: Project }>(`/api/projects/${id}`, {
          method: 'PATCH',
          body: updates
        })
        const index = this.projects.findIndex((project: Project) => project.id === id)
        if (index !== -1) {
          this.projects[index] = response.project
        }
      } catch (error) {
        console.error('Error updating project:', error)
        this.error = 'Failed to update project'
      } finally {
        this.isLoading = false
      }
    },

    async deleteProject(id: string) {
      this.isLoading = true
      this.error = null
      try {
        await $fetch<{ success: boolean }>(`/api/projects/${id}`, {
          method: 'DELETE'
        })
        this.projects = this.projects.filter((project: Project) => project.id !== id)
      } catch (error) {
        console.error('Error deleting project:', error)
        this.error = 'Failed to delete project'
      } finally {
        this.isLoading = false
      }
    }
  }
}) 