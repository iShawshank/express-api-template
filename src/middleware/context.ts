import type { RequestHandler } from 'express'

export const ContextMiddleware: RequestHandler = (req, res, next): void => {
  next()
}
