import express from 'express'
import {
  formatDetailResponse,
  formatErrorResponse,
  formatSearchResponse,
} from '../utils/responseFormats'
import ExampleService from '../services/exampleService'

export default class ExampleController {
  public static async getExample(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    try {
      const { id } = req.params
      const example = await ExampleService.getExampleById(id)
      res.status(200).json(formatDetailResponse(example))
    } catch (error) {
      const status = error.status ?? 400
      const message = error.message ?? 'An error occurred'
      res.status(status).json(formatErrorResponse(message, status))
    }
  }

  public static async searchExamples(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    try {
      const { ids } = req.body
      const examples = await ExampleService.searchExamplesByIds(ids)

      res
        .status(200)
        .json(
          formatSearchResponse(examples, {
            page: 1,
            pageSize: 10,
            totalCount: examples.length,
          })
        )
    } catch (error) {
      const status = error.status ?? 400
      const message = error.message ?? 'An error occurred'
      res.status(status).json(formatErrorResponse(message, status))
    }
  }
}
