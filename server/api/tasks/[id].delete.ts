import { Client, query as q } from 'faunadb'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const client = new Client({
    secret: config.faunaKey
  })

  const id = event.context.params.id

  try {
    await client.query(
      q.Delete(q.Ref(q.Collection('tasks'), id))
    )
    return { success: true }
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: 'Failed to delete task'
    })
  }
}) 