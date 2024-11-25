import { Client, query as q } from 'faunadb'
import type { Meeting } from '~/types'
import type { FaunaResponse, FaunaPageResponse } from '~/types/fauna'
import type { MeetingsResponse } from '~/types/api'

export default defineEventHandler(async (event): Promise<MeetingsResponse> => {
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
    const result = await client.query<FaunaPageResponse<Meeting>>(
      q.Map(
        q.Paginate(q.Documents(q.Collection('meetings'))),
        q.Lambda('ref', q.Get(q.Var('ref')))
      )
    )

    return {
      meetings: result.data.map((doc) => {
        const { data, ref } = doc
        const { id: _, ...meetingData } = data
        return {
          id: ref.id,
          ...meetingData
        }
      })
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch meetings'
    })
  }
}) 