export interface User {
  id: string
  email: string
  user_metadata: {
    full_name?: string
    avatar_url?: string
  }
}

export interface Hub {
  id: string
  title: string
  path: string
  icon: string
  stats: {
    tasks: number
    events: number
    notes: number
  }
}

export interface Task {
  id: string
  title: string
  description?: string
  completed: boolean
  due_date?: string
  priority: 'low' | 'medium' | 'high'
  hub_id: string
  created_at: string
  updated_at: string
}

export interface Note {
  id: string
  title: string
  content: string
  hub_id: string
  created_at: string
  updated_at: string
  tags?: string[]
}

export interface Event {
  id: string
  title: string
  description?: string
  start_date: string
  end_date: string
  hub_id: string
  created_at: string
  updated_at: string
}

export interface Project {
  id: string
  title: string
  description?: string
  status: 'planning' | 'in-progress' | 'review' | 'completed'
  priority: 'low' | 'medium' | 'high'
  due_date?: string
  created_at: string
  updated_at: string
  tasks?: string[]
}

export interface Meeting {
  id: string
  title: string
  description?: string
  start_date: string
  end_date: string
  attendees?: string[]
  location?: string
  created_at: string
  updated_at: string
} 