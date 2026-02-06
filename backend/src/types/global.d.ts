import type { Request } from 'express'

export {}

declare global {
  type BodyRequest<T> = Request<Record<string, never>, unknown, T>
  type QueryRequest<T> = Request<Record<string, never>, unknown, unknown, T>
  type Timestamp = number
}
