import { Client, query as q } from 'faunadb'
import type { Meeting } from '~/types'
import type { FaunaResponse } from '~/types/fauna'
import type { MeetingResponse } from '~/types/api'

export default defineEventHandler(async (event): Promise<MeetingResponse> => {
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
      message: 'Meeting ID is required'
    })
  }

  const body = await readBody(event)

  try {
    const result = await client.query<FaunaResponse<Meeting>>(
      q.Update(q.Ref(q.Collection('meetings'), params.id), {
        data: {
          ...body,
          updated_at: q.Now()
        }
      })
    )

    const { data, ref } = result
    const { id: _, ...meetingData } = data

    return {
      meeting: {
        id: ref.id,
        ...meetingData
      }
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: 'Failed to update meeting'
    })
  }
}) 