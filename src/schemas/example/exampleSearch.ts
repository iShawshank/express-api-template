import Joi from 'joi'
import {
  formatErrorResponseSchema,
  formatSearchResponseSchema,
} from '../response/responseSchema'
import { ExampleCard } from './types'

// Define all query, params, and body schemas for input validation
const body = {
  ids: Joi.array()
    .items(Joi.string())
    .required()
    .description('An array of unique identifiers for the examples to search.')
    .example(['12345', '67890']),
  brand: Joi.string()
    .description(
      'Optional brand filter to narrow down the search results. If provided, it will filter examples by this brand.'
    )
    .example('IAM'),
}

// Define responses schema for the route
export const ExampleGetByIdsResponsesSchema = {
  200: formatSearchResponseSchema(ExampleCard),
  400: formatErrorResponseSchema(400),
  404: formatErrorResponseSchema(404),
}

/**
 * Define the full Joi schema for the route
 * including params, query, body and responses
 */
export const ExampleGetByIds = Joi.object()
  .keys({
    body: { ...body },
    responses: ExampleGetByIdsResponsesSchema,
  })
  .description('Retrieves an array of examples by ids')
