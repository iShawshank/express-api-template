import Joi from 'joi'

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

/**
 * Define schema for example card type. Make sure to
 * export all schemas that you want to generate types for
 */
export const ExampleCard = Joi.object({
  id: Joi.string()
    .example('12345')
    .description('Unique identifier of the example'),
  brand: Joi.string().example('IAM').description('Brand of the example'),
  name: Joi.string().example('Example Name').description('Name of the example'),
}).meta({
  className: 'ExampleCard', // This will ensure the type is generated
})
