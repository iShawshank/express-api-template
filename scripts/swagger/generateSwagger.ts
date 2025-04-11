import { routes } from './registerRoutes'
import { version } from '../../package.json'

import { generateSwaggerRoutes } from './swaggerRoutes'
import { writeFileSync } from 'fs'

const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'API Documentation',
    version,
  },
  paths: {},
  components: {
    schemas: {},
  },
}

console.log('[SWAGGER]: Generating Swagger Document...')

generateSwaggerRoutes()

// loop through routes and add each to swagger doc
routes.forEach((route) => {
  swaggerDocument.components = {
    schemas: {
      ...swaggerDocument.components.schemas,
      ...route.components.schemas,
    },
  }
  const path = route.path
  if (!swaggerDocument.paths[path]) {
    swaggerDocument.paths[path] = {}
  }
  swaggerDocument.paths[path][route.method] = {
    summary: route.summary,
    description: route.description,
    tags: route.tags,
    parameters: route.parameters,
    requestBody: route.requestBody,
    responses: route.responses,
  }
})

writeFileSync(`./docs/swagger.json`, JSON.stringify(swaggerDocument, null, 2))
