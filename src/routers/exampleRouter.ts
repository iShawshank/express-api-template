import * as express from 'express'
import ExampleController from '../controllers/exampleController'
import {
  validateRequest,
} from '../validators/validateRequest'
import { ExampleGetByIdSchema, ExampleBulkSchema } from '../schemas'

export default class ExampleRouter {
  public expressRouter = express.Router()

  constructor() {
    this.initalizeRoutes()
  }

  private readonly prefix = '/example'

  initalizeRoutes() {
    this.expressRouter.post(
      `${this.prefix}`,
      validateRequest(ExampleBulkSchema),
      ExampleController.searchExamples
    )
    this.expressRouter.get(
      `${this.prefix}/:id`,
      validateRequest(ExampleGetByIdSchema, 'query'),
      ExampleController.getExample
    )
  }
}
