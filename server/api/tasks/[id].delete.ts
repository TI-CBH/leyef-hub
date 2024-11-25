import { Client, query as q } from 'faunadb'
import type { DeleteResponse } from '~/types/api'

export default defineEventHandler(async (event): Promise<DeleteResponse> => {
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

  try {
    await client.query(
      q.Delete(q.Ref(q.Collection('tasks'), params.id))
    )
    return { success: true }
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: 'Failed to delete task'
    })
  }
}) 