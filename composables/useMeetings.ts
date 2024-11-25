import { defineStore } from 'pinia'
import type { Meeting } from '~/types'
import type { MeetingsResponse, MeetingResponse, DeleteResponse } from '~/types/api'

interface MeetingsState {
  meetings: Meeting[]
  isLoading: boolean
  error: string | null
}

export const useMeetings = defineStore('meetings', {
  state: (): MeetingsState => ({
    meetings: [],
    isLoading: false,
    error: null
  }),

  getters: {
    getUpcomingMeetings: (state) => {
      return state.meetings
        .filter((meeting: Meeting) => new Date(meeting.start_date) > new Date())
        .sort((a: Meeting, b: Meeting) => 
          new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
        )
    }
  },

  actions: {
    async fetchMeetings() {
      this.isLoading = true
      this.error = null
      try {
        const response = await $fetch<MeetingsResponse>('/api/meetings')
        this.meetings = response.meetings
      } catch (error) {
        console.error('Error fetching meetings:', error)
        this.error = 'Failed to fetch meetings'
      } finally {
        this.isLoading = false
      }
    },

    async addMeeting(meeting: Omit<Meeting, 'id' | 'created_at' | 'updated_at'>) {
      this.isLoading = true
      this.error = null
      try {
        const response = await $fetch<MeetingResponse>('/api/meetings/create', {
          method: 'POST',
          body: meeting
        })
        this.meetings.push(response.meeting)
      } catch (error) {
        console.error('Error adding meeting:', error)
        this.error = 'Failed to add meeting'
      } finally {
        this.isLoading = false
      }
    },

    async updateMeeting(id: string, updates: Partial<Meeting>) {
      this.isLoading = true
      this.error = null
      try {
        const response = await $fetch<MeetingResponse>(`/api/meetings/${id}`, {
          method: 'PATCH',
          body: updates
        })
        const index = this.meetings.findIndex((meeting: Meeting) => meeting.id === id)
        if (index !== -1) {
          this.meetings[index] = response.meeting
        }
      } catch (error) {
        console.error('Error updating meeting:', error)
        this.error = 'Failed to update meeting'
      } finally {
        this.isLoading = false
      }
    },

    async deleteMeeting(id: string) {
      this.isLoading = true
      this.error = null
      try {
        await $fetch<DeleteResponse>(`/api/meetings/${id}`, {
          method: 'DELETE'
        })
        this.meetings = this.meetings.filter((meeting: Meeting) => meeting.id !== id)
      } catch (error) {
        console.error('Error deleting meeting:', error)
        this.error = 'Failed to delete meeting'
      } finally {
        this.isLoading = false
      }
    }
  }
}) 