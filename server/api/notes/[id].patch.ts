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

  const params = event.context.params
  if (!params?.id) {
    throw createError({
      statusCode: 400,
      message: 'Note ID is required'
    })
  }

  const body = await readBody(event)

  try {
    const result = await client.query<FaunaResponse<Note>>(
      q.Update(q.Ref(q.Collection('notes'), params.id), {
        data: {
          ...body,
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
      message: 'Failed to update note'
    })
  }
}) 