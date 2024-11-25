import { Client, query as q } from 'faunadb'
import type { Task } from '~/types'
import type { FaunaResponse } from '~/types/fauna'
import type { TaskResponse } from '~/types/api'

export default defineEventHandler(async (event): Promise<TaskResponse> => {
  const config = useRuntimeConfig()
  if (!config.faunaKey) {
    throw createError({
      statusCode: 500,
      message: 'Fauna key is not configured'
    })
  }

  const client = new Client({
    secret: config.faunaKey
  })

  const params = event.context.params
  if (!params?.id) {
    throw createError({
      statusCode: 400,
      message: 'Task ID is required'
    })
  }

  const body = await readBody(event)

  try {
    const result = await client.query<FaunaResponse<Task>>(
      q.Update(q.Ref(q.Collection('tasks'), params.id), {
        data: {
          ...body,
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
      message: 'Failed to update task'
    })
  }
}) 