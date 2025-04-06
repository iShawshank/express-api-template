import Joi from 'joi'

export const ExampleGetByIdSchema = Joi.object()
  .keys({
    brand: Joi.string().max(10).required().description('brand').example('IAM'),
  })
  .meta({
    className: 'Get Example By ID',
    description:
      'Retrieve an example by its unique identifier. This endpoint allows you to get the details of a specific example using its ID.',
  })

export const ExampleBulkSchema = Joi.object()
  .keys({
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
  })
  .meta({
    className: 'Get Examples By Ids',
    description: 'Search for examples by ids',
  })
