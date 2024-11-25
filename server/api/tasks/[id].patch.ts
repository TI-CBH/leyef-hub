import { Client, query as q } from 'faunadb'
import type { Task } from '~/types'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const client = new Client({
    secret: config.faunaKey
  })

  const id = event.context.params.id
  const body = await readBody(event)

  try {
    const result = await client.query(
      q.Update(q.Ref(q.Collection('tasks'), id), {
        data: {
          ...body,
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
      message: 'Failed to update task'
    })
  }
}) 