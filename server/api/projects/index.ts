import { Client, query as q } from 'faunadb'
import type { Project } from '~/types'
import type { FaunaResponse, FaunaPageResponse } from '~/types/fauna'
import type { ProjectsResponse } from '~/types/api'

export default defineEventHandler(async (event): Promise<ProjectsResponse> => {
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
    const result = await client.query<FaunaPageResponse<Project>>(
      q.Map(
        q.Paginate(q.Documents(q.Collection('projects'))),
        q.Lambda('ref', q.Get(q.Var('ref')))
      )
    )

    return {
      projects: result.data.map((doc) => {
        const { data, ref } = doc
        const { id: _, ...projectData } = data
        return {
          id: ref.id,
          ...projectData
        }
      })
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch projects'
    })
  }
}) 