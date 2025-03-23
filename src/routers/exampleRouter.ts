import * as express from 'express'
import ExampleController from '../controllers/exampleController'
import ExampleValidator from '../validators/exampleValidator'

export default class ExampleRouter {
  public expressRouter = express.Router()

  constructor() {
    this.initalizeRoutes()
  }

  private readonly prefix = '/example'

  initalizeRoutes() {
    this.expressRouter.post(
      `${this.prefix}`,
      ExampleValidator.validateSearchExamples,
      ExampleController.searchExamples
    )
    this.expressRouter.get(
      `${this.prefix}/:id`,
      ExampleValidator.validateGetExample,
      ExampleController.getExample
    )
  }
}
