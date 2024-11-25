import { defineStore } from 'pinia'
import type { Note } from '~/types'

interface NotesState {
  notes: Note[]
  isLoading: boolean
  error: string | null
}

export const useNotes = defineStore('notes', {
  state: (): NotesState => ({
    notes: [],
    isLoading: false,
    error: null
  }),

  getters: {
    getNotesByHub: (state) => (hubId: string) => {
      return state.notes.filter((note: Note) => note.hub_id === hubId)
    },
    
    getNotesByTag: (state) => (tag: string) => {
      return state.notes.filter((note: Note) => note.tags?.includes(tag))
    }
  },

  actions: {
    async fetchNotes() {
      this.isLoading = true
      this.error = null
      try {
        const response = await $fetch<{ notes: Note[] }>('/api/notes')
        this.notes = response.notes
      } catch (error) {
        console.error('Error fetching notes:', error)
        this.error = 'Failed to fetch notes'
      } finally {
        this.isLoading = false
      }
    },

    async addNote(note: Omit<Note, 'id' | 'created_at' | 'updated_at'>) {
      this.isLoading = true
      this.error = null
      try {
        const response = await $fetch<{ note: Note }>('/api/notes/create', {
          method: 'POST',
          body: note
        })
        this.notes.push(response.note)
      } catch (error) {
        console.error('Error adding note:', error)
        this.error = 'Failed to add note'
      } finally {
        this.isLoading = false
      }
    },

    async updateNote(id: string, updates: Partial<Note>) {
      this.isLoading = true
      this.error = null
      try {
        const response = await $fetch<{ note: Note }>(`/api/notes/${id}`, {
          method: 'PATCH',
          body: updates
        })
        const index = this.notes.findIndex((note: Note) => note.id === id)
        if (index !== -1) {
          this.notes[index] = response.note
        }
      } catch (error) {
        console.error('Error updating note:', error)
        this.error = 'Failed to update note'
      } finally {
        this.isLoading = false
      }
    },

    async deleteNote(id: string) {
      this.isLoading = true
      this.error = null
      try {
        await $fetch<{ success: boolean }>(`/api/notes/${id}`, {
          method: 'DELETE'
        })
        this.notes = this.notes.filter((note: Note) => note.id !== id)
      } catch (error) {
        console.error('Error deleting note:', error)
        this.error = 'Failed to delete note'
      } finally {
        this.isLoading = false
      }
    }
  }
}) 