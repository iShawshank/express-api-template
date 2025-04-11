import express from 'express'
import Joi from 'joi'

const schemasEnum = Object.freeze({
  BODY: 'body',
  PARAMS: 'params',
  QUERY: 'query',
})

/**
 * Middleware to validate request against a Joi schema
 * @param schema Joi schema to validate against
 * @param location location of the request data (body, params, query)
 */
export const validateRequest = (schema: Joi.Schema) => {
  return (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const schemas = Object.values(schemasEnum)
    let errorResp: string | null = null
    // const objectSchema: Joi.Description = schema.describe()

    for (const key of schemas) {
      let extractedSchema: Joi.Schema | null = null

      try {
        extractedSchema = schema.extract(key)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        continue
      }
      if (extractedSchema) {
        const { error } = extractedSchema.validate(req[key])
        if (error) {
          errorResp = error.message
          break
        }
      }
    }

    if (errorResp) {
      res.status(400).send({
        message: errorResp,
      })
    } else {
      next()
    }
  }
}
