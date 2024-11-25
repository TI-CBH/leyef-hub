import { Client, query as q } from 'faunadb'
import type { Task } from '~/types'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const client = new Client({
    secret: config.faunaKey
  })

  const body = await readBody(event)

  try {
    const result = await client.query(
      q.Create(q.Collection('tasks'), {
        data: {
          ...body,
          created_at: q.Now(),
          updated_at: q.Now()
        }
      })
    )

    return {
      task: {
        id: result.ref.id,
        ...result.data
      }
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: 'Failed to create task'
    })
  }
}) 