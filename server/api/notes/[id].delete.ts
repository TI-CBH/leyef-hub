import { Client, query as q } from 'faunadb'
import type { DeleteResponse } from '~/types/api'

export default defineEventHandler(async (event): Promise<DeleteResponse> => {
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

  const params = event.context.params
  if (!params?.id) {
    throw createError({
      statusCode: 400,
      message: 'Note ID is required'
    })
  }

  try {
    await client.query(
      q.Delete(q.Ref(q.Collection('notes'), params.id))
    )
    return { success: true }
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: 'Failed to delete note'
    })
  }
}) 