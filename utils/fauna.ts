import { Client, query as q } from 'faunadb'
import type { Task } from '~/types'

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
    const result = await client.query(
      q.Map(
        q.Paginate(q.Documents(q.Collection('tasks'))),
        q.Lambda('ref', q.Get(q.Var('ref')))
      )
    )
    return result.data.map((doc: any) => ({
      id: doc.ref.id,
      ...doc.data
    }))
  },

  async createTask(task: Omit<Task, 'id' | 'created_at' | 'updated_at'>): Promise<Task> {
    const client = createFaunaClient()
    const result = await client.query(
      q.Create(q.Collection('tasks'), {
        data: {
          ...task,
          created_at: q.Now(),
          updated_at: q.Now()
        }
      })
    )
    return {
      id: result.ref.id,
      ...result.data
    }
  },

  async updateTask(id: string, updates: Partial<Task>): Promise<Task> {
    const client = createFaunaClient()
    const result = await client.query(
      q.Update(q.Ref(q.Collection('tasks'), id), {
        data: {
          ...updates,
          updated_at: q.Now()
        }
      })
    )
    return {
      id: result.ref.id,
      ...result.data
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