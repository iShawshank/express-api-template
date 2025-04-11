import Joi from 'joi'
import {
  formatDetailResponseSchema,
  formatErrorResponseSchema,
} from './responseSchema'

/**
 * Define schema for example detail type. Make sure to
 * export all schemas that you want to generate types for
 */
export const exampleDetail = Joi.object({
  id: Joi.string()
    .example('12345')
    .description('Unique identifier of the example'),
  brand: Joi.string().example('IAM').description('Brand of the example'),
  name: Joi.string().example('Example Name').description('Name of the example'),
  image: Joi.string()
    .example('https://example.com/image.jpg')
    .description('Image URL'),
})
  .description('OK response')
  .meta({
    className: 'ExampleDetail', // This will ensure the TypeScript type is generated
  })

// Define query, params, body schemas for input validation
const query = {
  brand: Joi.string().max(10).required().description('brand').example('IAM'),
}
const params = {
  id: Joi.string().required().description('example shaw brand').example('IAM'),
}

// Define responses schema for the route
const ExampleGetByIdResponsesSchema = {
  200: formatDetailResponseSchema(exampleDetail),
  400: formatErrorResponseSchema(400, 'Error: something went wrong'),
  404: formatErrorResponseSchema(404, 'Error: example not found'),
}

/**
 * Define the full Joi schema for the route
 * including params, query, body and responses
 */
export const ExampleGetById = Joi.object().keys({
  query: { ...query },
  params: { ...params },
  responses: ExampleGetByIdResponsesSchema,
})
