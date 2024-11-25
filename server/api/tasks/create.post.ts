import { Client, query as q } from 'faunadb'
import type { Task } from '~/types'
import type { FaunaResponse } from '~/types/fauna'
import type { TaskResponse } from '~/types/api'

export default defineEventHandler(async (event): Promise<TaskResponse> => {
  const config = useRuntimeConfig()
  const faunaKey = config.faunaKey as string
  if (!faunaKey) {
    throw createError({
      statusCode: 500,
      message: 'Fauna key is not configured'
    })
  }

  const client = new Client({
    secret: faunaKey
  })

  const body = await readBody(event)

  try {
    const result = await client.query<FaunaResponse<Task>>(
      q.Create(q.Collection('tasks'), {
        data: {
          ...body,
          created_at: q.Now(),
          updated_at: q.Now()
        }
      })
    )

    const { data, ref } = result
    const { id: _, ...taskData } = data

    return {
      task: {
        id: ref.id,
        ...taskData
      }
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: 'Failed to create task'
    })
  }
}) 