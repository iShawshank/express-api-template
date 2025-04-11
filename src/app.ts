import express, { type Router } from 'express'
import { ContextMiddleware } from './middleware/context'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from '../docs/swagger.json'

export default class App {
  private app: express.Application
  private port: number

  constructor(routers: Router[], port: number) {
    this.app = express()
    this.port = port

    this.app.use(express.json())
    this.app.use(ContextMiddleware)
    // Mount swagger UI locally
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
    this.initializeRouters('api', routers)
  }

  private initializeRouters(path: string, routers: Router[]) {
    routers.forEach((router) => {
      if (router) {
        this.app.use(`/${path}/`, router)
      }
    })

    console.log('Routers initialized')
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on port ${this.port}`)
    })
  }

  public getExpressApp() {
    return this.app
  }
}
