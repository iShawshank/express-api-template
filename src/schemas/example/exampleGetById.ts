import Joi from 'joi'
import {
  formatDetailResponseSchema,
  formatErrorResponseSchema,
} from '../response/responseSchema'
import { exampleDetail } from './types'

// Define query, params, body schemas for input validation
const query = {
  brand: Joi.string().max(10).required().description('brand').example('IAM'),
}
const params = {
  id: Joi.string().required().description('ID of the example').example('1234'),
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
