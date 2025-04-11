# Auto Swagger Doc guide

## To add a new route to swagger doc

This will walk through adding an example route to the auto generation process.

For this example lets consider that we have the following express route:

```
endpoint: /api/example/:id
method: get
param: id: string // required
query: {
  brand: string // required
}
```

Example request: GET http://localhost:3001/api/example/1234?brand=hello

Example response:

```JSON
{
    "apiVersion": "v1.0",
    "data": {
        "result": {
            "id": "1234"
        }
    }
}
```

### Steps required to add the route to swagger docs

1. Create new Joi Schema in src/schemas for the new route. ex: For this example we'll create it as `src/schemas/ExampleGetById.ts`
2. In new schema, create a Joi Schema for the data that will be returned from the endpoint. (Complete schema example will be found at the bottom of this README).

```TypeScript
/**
 * Define schema for example detail type. Make sure to
 * export all schemas that you want to generate typescript * types for
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
    className: 'ExampleDetail', // This will ensure the TypeScript type is generated as long as this object is exported
  })
```

3. Next, define query, params, and body Joi Schemas for the request validation (still in the schema file)

ex: for this endpoint there will be query and params required in the request

```TypeScript
const query = {
  brand: Joi.string().max(10).required().description('brand').example('IAM'),
}
const params = {
  id: Joi.string().required().description('example shaw brand').example('IAM'),
}
```

4. Next define the responses for the api docs in the same schema
   ex:

```TypeScript
const ExampleGetByIdResponsesSchema = {
  200: formatDetailResponseSchema(exampleDetail),
  400: formatErrorResponseSchema(400, 'Error: something went wrong'),
  404: formatErrorResponseSchema(404, 'Error: example not found'),
}
```

5. Now we need to define the full route schema and export it from this Schema file.
   Ex:

```TypeScript
/**
 * Define the full Joi schema for the route
 * including params, query, body and responses
 */
export const ExampleGetById = Joi.object().keys({
  query: { ...query },
  params: { ...params },
  responses: ExampleGetByIdResponsesSchema,
})
```

6. Next, we need to add the new route to the SwaggerRoutes (/scripts/swagger/swaggerRoutes.ts) `generateSwaggerRoutes` method so your new route and schema will be added to the swagger doc.

```TypeScript
  registerRoute({
    method: 'get',
    path: '/api/example/{id}',
    summary: 'Get example by id',
    description: 'Retrieves an example by id',
    tags: ['Example'],
    schema: ExampleGetById,
  })
```

7. Last, we need to generate the types and update the swagger doc

To accomplish this, run `npm run generate`. This will generate the types for your new route in /src/interfaces/joi-types/ and also generate the swagger.json file in /docs/swagger.json.

## Full Example file for src/schemas/ExampleGetById.ts

```TypeScript
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
```
