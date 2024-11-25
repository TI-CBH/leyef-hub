import { Client, query as q } from 'faunadb'
import type { Task } from '~/types'
import type { FaunaResponse, FaunaPageResponse } from '~/types/fauna'

// Initialize FaunaDB client
const createFaunaClient = () => {
  const config = useRuntimeConfig()
  return new Client({
    secret: config.public.faunaKey
  })
}

// Task queries
export const taskQueries = {
  async getAllTasks(): Promise<Task[]> {
    const client = createFaunaClient()
    const result = await client.query<FaunaPageResponse<Task>>(
      q.Map(
        q.Paginate(q.Documents(q.Collection('tasks'))),
        q.Lambda('ref', q.Get(q.Var('ref')))
      )
    )
    return result.data.map((doc) => {
      const { id, ...data } = doc.data
      return {
        id: doc.ref.id,
        ...data
      }
    })
  },

  async createTask(task: Omit<Task, 'id' | 'created_at' | 'updated_at'>): Promise<Task> {
    const client = createFaunaClient()
    const result = await client.query<FaunaResponse<Task>>(
      q.Create(q.Collection('tasks'), {
        data: {
          ...task,
          created_at: q.Now(),
          updated_at: q.Now()
        }
      })
    )
    const { id, ...data } = result.data
    return {
      id: result.ref.id,
      ...data
    }
  },

  async updateTask(id: string, updates: Partial<Task>): Promise<Task> {
    const client = createFaunaClient()
    const result = await client.query<FaunaResponse<Task>>(
      q.Update(q.Ref(q.Collection('tasks'), id), {
        data: {
          ...updates,
          updated_at: q.Now()
        }
      })
    )
    const { id: _, ...data } = result.data
    return {
      id: result.ref.id,
      ...data
    }
  },

  async deleteTask(id: string): Promise<boolean> {
    const client = createFaunaClient()
    await client.query(
      q.Delete(q.Ref(q.Collection('tasks'), id))
    )
    return true
  }
} 