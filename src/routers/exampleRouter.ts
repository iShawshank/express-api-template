import * as express from 'express'
import ExampleController from '../controllers/exampleController'
import { validateRequest } from '../validators/validateRequest'
import { ExampleGetByIds } from '../schemas/exampleSearch'
import { ExampleGetById } from '../schemas/exampleGetById'

export default class ExampleRouter {
  public expressRouter = express.Router()

  constructor() {
    this.initalizeRoutes()
  }

  private readonly prefix = '/example'

  initalizeRoutes() {
    this.expressRouter.post(
      `${this.prefix}`,
      validateRequest(ExampleGetByIds),
      ExampleController.searchExamples
    )
    this.expressRouter.get(
      `${this.prefix}/:id`,
      validateRequest(ExampleGetById),
      ExampleController.getExample
    )
  }
}
