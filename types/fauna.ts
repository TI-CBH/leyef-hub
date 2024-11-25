import type { Collection } from 'faunadb'

export interface FaunaRef {
  id: string
  collection: typeof Collection
}

export interface FaunaResponse<T> {
  ref: FaunaRef
  ts: number
  data: T
}

export interface FaunaPageResponse<T> {
  data: FaunaResponse<T>[]
  after?: FaunaRef
  before?: FaunaRef
} 