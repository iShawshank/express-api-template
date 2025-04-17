import { ExampleGetById } from '../../src/schemas/example/exampleGetById'
import { ExampleGetByIds } from '../../src/schemas/example/exampleSearch'
import { registerRoute } from './registerRoutes'

export const generateSwaggerRoutes = () => {
  console.log('[SWAGGER]: Generating Swagger Routes...')

  registerRoute({
    method: 'post',
    path: '/api/example',
    summary: 'Search examples by ids',
    description: 'Retrieves an array of examples by ids',
    tags: ['Example'],
    schema: ExampleGetByIds,
  })

  registerRoute({
    method: 'get',
    path: '/api/example/{id}',
    summary: 'Get example by id',
    description: 'Retrieves an example by id',
    tags: ['Example'],
    schema: ExampleGetById,
  })

  console.log('[SWAGGER]: Swagger Routes Generated')
}
