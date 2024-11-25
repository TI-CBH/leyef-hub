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

  const body = await readBody(event)

  try {
    const result = await client.query<FaunaResponse<Project>>(
      q.Create(q.Collection('projects'), {
        data: {
          ...body,
          created_at: q.Now(),
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
      message: 'Failed to create project'
    })
  }
}) 