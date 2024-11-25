import { Client, query as q } from 'faunadb'
import type { Project } from '~/types'
import type { FaunaResponse } from '~/types/fauna'
import type { ProjectResponse } from '~/types/api'

export default defineEventHandler(async (event): Promise<ProjectResponse> => {
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
      message: 'Project ID is required'
    })
  }

  const body = await readBody(event)

  try {
    const result = await client.query<FaunaResponse<Project>>(
      q.Update(q.Ref(q.Collection('projects'), params.id), {
        data: {
          ...body,
          updated_at: q.Now()
        }
      })
    )

    const { data, ref } = result
    const { id: _, ...projectData } = data

    return {
      project: {
        id: ref.id,
        ...projectData
      }
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: 'Failed to update project'
    })
  }
}) 