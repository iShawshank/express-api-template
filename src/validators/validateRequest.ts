import express from 'express'

/**
 * Middleware to validate request against a Joi schema
 * @param schema Joi schema to validate against
 * @param location location of the request data (body, params, query)
 */
export const validateRequest = (schema, location = 'body') => {
  return (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const { error } = schema.validate(req[location])
    if (error) {
      const errorResp = {
        message: error.message,
      }
      res.status(400).send(errorResp)
    } else {
      next()
    }
  }
}
