import { Client, query as q } from 'faunadb'
import type { Task } from '~/types'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const client = new Client({
    secret: config.faunaKey
  })

  try {
    const result = await client.query(
      q.Map(
        q.Paginate(q.Documents(q.Collection('tasks'))),
        q.Lambda('ref', q.Get(q.Var('ref')))
      )
    )

    return {
      tasks: result.data.map((doc: any) => ({
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