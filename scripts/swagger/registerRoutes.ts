/* eslint-disable @typescript-eslint/no-explicit-any */
import convert from 'joi-to-swagger'
import Joi from 'joi'

const schemasEnum = Object.freeze({
  BODY: 'body',
  PARAMS: 'params',
  QUERY: 'query',
  RESPONSES: 'responses',
})

interface RouteOptions {
  method: string
  path: string
  schema: Joi.Schema
  summary?: string
  description?: string
  tags?: string[]
}

interface Params {
  name: string
  in: string
  required: boolean
  schema: Joi.Schema
  description?: string
  example?: string
}

interface SwaggerRoute {
  path: string
  schema: Joi.Schema
  method: string
  summary?: string
  description?: string
  tags: string[]
  parameters: Params[]
  requestBody: Record<string, any>
  responses: Record<string, any>
  components: Record<string, any>
}

// All swagger routes
const routes: SwaggerRoute[] = []

/**
 * Generate a Swagger Route and format it for OpenAPI 3.0
 * @param {Object} options - Options for the route registration.
 */
const registerRoute = ({
  method,
  path,
  schema,
  summary,
  description,
  tags = [],
}: RouteOptions) => {
  const parameters: Params[] = []
  const requestBody: { content?: Record<string, any> } = {}
  let responses = {}

  let paramSchema: Joi.Schema | null = null
  let querySchema: Joi.Schema | null = null
  let bodySchema: Joi.Schema | null = null
  let responsesSchema: Joi.Schema | null = null

  // Extract sub-schemas from the Joi schema
  //
  const schemas = Object.values(schemasEnum)
  for (const key of schemas) {
    let extractedSchema: Joi.Schema | null = null

    try {
      extractedSchema = schema.extract(key)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      // no key found in schema, just proceed
      continue
    }

    if (extractedSchema) {
      switch (key) {
        case schemasEnum.PARAMS:
          paramSchema = extractedSchema
          break
        case schemasEnum.QUERY:
          querySchema = extractedSchema
          break
        case schemasEnum.BODY:
          bodySchema = extractedSchema
          break
        case schemasEnum.RESPONSES:
          responsesSchema = extractedSchema
      }
    }
  }

  const { components } = convert(schema)

  // Add all params to parameters array
  if (paramSchema) {
    const { swagger: paramsSwagger } = convert(paramSchema)
    const paramsRequired: string[] = paramsSwagger.required ?? []
    parameters.push(
      ...Object.keys(paramsSwagger.properties).map((key) => ({
        name: key,
        in: 'path',
        required: paramsRequired.includes(key),
        schema: paramsSwagger.properties[key],
        // description: paramsSwagger.properties[key].description,
        // example: paramsSwagger.properties[key].example,
      }))
    )
  }

  if (querySchema) {
    const { swagger: querySwagger } = convert(querySchema)
    const queryRequired = querySwagger.required ?? []
    parameters.push(
      ...Object.keys(querySwagger.properties).map((key) => ({
        name: key,
        in: 'query',
        required: queryRequired.includes(key),
        schema: querySwagger.properties[key],
        description: querySwagger.properties[key].description,
        // example: querySwagger.properties[key].example,
      }))
    )
  }

  if (bodySchema) {
    const { swagger: bodySwagger } = convert(bodySchema)
    const bodyRequired = bodySwagger.required ?? []
    requestBody.content = {
      'application/json': {
        schema: bodySwagger,
      },
    }
    parameters.push(
      ...Object.keys(bodySwagger.properties).map((key) => ({
        name: key,
        in: 'body',
        required: bodyRequired?.includes(key),
        schema: bodySwagger.properties[key],
        description: bodySwagger.properties[key].description,
        // example: querySwagger.properties[key].example,
      }))
    )
  }

  if (responsesSchema) {
    const { swagger: responseSwagger } = convert(responsesSchema)
    const responsesArray = Object.keys(responseSwagger.properties).map(
      (key) => ({
        [key]: {
          description: responseSwagger.properties[key].description,
          content: {
            'application/json': {
              schema: responseSwagger.properties[key],
            },
          },
        },
      })
    )

    responses = {
      // convert responsesArray to object
      ...responsesArray.reduce((acc, curr) => ({ ...acc, ...curr }), {}),
    }
  }

  routes.push({
    path,
    schema,
    method,
    summary,
    description,
    tags,
    parameters,
    requestBody,
    responses,
    components: components ?? {},
  })
}

export { registerRoute, routes }
