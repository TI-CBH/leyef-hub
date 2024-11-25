import { Client, query as q } from 'faunadb'
import type { Note } from '~/types'
import type { FaunaResponse } from '~/types/fauna'
import type { NoteResponse } from '~/types/api'

export default defineEventHandler(async (event): Promise<NoteResponse> => {
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
    const result = await client.query<FaunaResponse<Note>>(
      q.Create(q.Collection('notes'), {
        data: {
          ...body,
          created_at: q.Now(),
          updated_at: q.Now()
        }
      })
    )

    const { data, ref } = result
    const { id: _, ...noteData } = data

    return {
      note: {
        id: ref.id,
        ...noteData
      }
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: 'Failed to create note'
    })
  }
}) 