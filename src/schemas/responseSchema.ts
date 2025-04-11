import Joi from 'joi'

/**
 * Define schema for example detail type. Make sure to
 * export all schemas that you want to generate types for
 */
export const pagination = Joi.object({
  page: Joi.number().integer().description('Current page number').example(1),
  pageSize: Joi.number()
    .integer()
    .description('Number of items per page')
    .example(10),
  totalCount: Joi.number()
    .integer()
    .description('Total number of items available')
    .example(100),
}).meta({
  className: 'Pagination', // This will ensure the type is generated
})

/**
 * Formats a detail response into a Joi Schema
 * @param dataSchema: Joi.Schema - The schema for the data in the response
 * @returns Joi.Schema - The formatted detail response schema
 */
export const formatDetailResponseSchema = (dataSchema: Joi.Schema) => {
  return Joi.object({
    apiVersion: Joi.string()
      .description('API version of the response')
      .example('v1.0'),
    data: Joi.object({
      result: dataSchema,
    }),
  }).description('OK detail response')
}

/**
 * Formats a detail response into a Joi Schema
 * @param dataSchema: Joi.Schema - The schema for the data in the result array
 * @returns Joi.Schema - The formatted detail response schema
 */
export const formatSearchResponseSchema = (dataSchema: Joi.Schema) => {
  return Joi.object({
    apiVersion: Joi.string()
      .description('API version of the response')
      .example('v1.0'),
    data: Joi.object({
      results: Joi.array().items(dataSchema),
      pagination,
    }),
  }).description('OK search response')
}

/**
 * Formats an error response into a Joi Schema
 * @param status: number - HTTP STATUS CODE
 * @param message: string - Optional error message
 * @returns Joi.Schema - The formatted error response schema
 */
export const formatErrorResponseSchema = (status: number, message?: string) => {
  return Joi.object({
    apiVersion: Joi.string()
      .description('API version of the response')
      .example('v1.0'),
    error: Joi.object({
      message: Joi.string()
        .description('Error message')
        .example(message ?? 'Error: error occurred'),
      status: Joi.number()
        .integer()
        .description('HTTP status code of the error')
        .example(status),
    }),
  }).description('Error response')
}
