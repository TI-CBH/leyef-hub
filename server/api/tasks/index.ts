import { Client, query as q } from 'faunadb'
import type { Task } from '~/types'
import type { FaunaResponse, FaunaPageResponse } from '~/types/fauna'
import type { TasksResponse } from '~/types/api'

export default defineEventHandler(async (event): Promise<TasksResponse> => {
  const config = useRuntimeConfig()
  const client = new Client({
    secret: config.faunaKey as string
  })

  try {
    const result = await client.query<FaunaPageResponse<Task>>(
      q.Map(
        q.Paginate(q.Documents(q.Collection('tasks'))),
        q.Lambda('ref', q.Get(q.Var('ref')))
      )
    )

    return {
      tasks: result.data.map((doc) => ({
        id: doc.ref.id,
        ...doc.data
      }))
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch tasks'
    })
  }
}) 