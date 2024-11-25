import { Client, query as q } from 'faunadb'
import type { Task } from '~/types'
import type { FaunaResponse, FaunaPageResponse } from '~/types/fauna'
import type { TasksResponse } from '~/types/api'

export default defineEventHandler(async (event): Promise<TasksResponse> => {
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

  try {
    const result = await client.query<FaunaPageResponse<Task>>(
      q.Map(
        q.Paginate(q.Documents(q.Collection('tasks'))),
        q.Lambda('ref', q.Get(q.Var('ref')))
      )
    )

    return {
      tasks: result.data.map((doc) => {
        const { data, ref } = doc
        const { id: _, ...taskData } = data
        return {
          id: ref.id,
          ...taskData
        }
      })
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch tasks'
    })
  }
}) 