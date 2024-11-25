import type { values } from 'faunadb'

export interface FaunaRef {
  id: string
  collection: values.Collection
}

export interface FaunaResponse<T> {
  ref: FaunaRef
  ts: number
  data: T
}

export interface FaunaPageResponse<T> {
  data: FaunaResponse<T>[]
  after?: values.Page
  before?: values.Page
} 