import type { Collection, values } from 'faunadb'

export interface FaunaRef {
  id: string
  collection: Collection
}

export interface FaunaResponse<T> {
  ref: FaunaRef
  ts: number
  data: T & { id?: string }
}

export interface FaunaPageResponse<T> {
  data: FaunaResponse<T>[]
  after?: unknown
  before?: unknown
} 