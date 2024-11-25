import { Client, query as q } from 'faunadb'
import type { Note } from '~/types'
import type { FaunaResponse, FaunaPageResponse } from '~/types/fauna'
import type { NotesResponse } from '~/types/api'

export default defineEventHandler(async (event): Promise<NotesResponse> => {
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
    const result = await client.query<FaunaPageResponse<Note>>(
      q.Map(
        q.Paginate(q.Documents(q.Collection('notes'))),
        q.Lambda('ref', q.Get(q.Var('ref')))
      )
    )

    return {
      notes: result.data.map((doc) => {
        const { data, ref } = doc
        const { id: _, ...noteData } = data
        return {
          id: ref.id,
          ...noteData
        }
      })
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch notes'
    })
  }
}) 