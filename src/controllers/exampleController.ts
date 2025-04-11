import express from 'express'
import {
  formatDetailResponse,
  formatErrorResponse,
  formatSearchResponse,
} from '../utils/responseFormats'

export default class ExampleController {
  public static async getExample(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    try {
      const { id } = req.params
      res.status(200).json(formatDetailResponse({ id }))
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
      const newIds = ids.map((id) => ({ id }))

      res
        .status(200)
        .json(
          formatSearchResponse(
            { examples: newIds },
            { page: 1, pageSize: 10, totalCount: newIds.length }
          )
        )
    } catch (error) {
      const status = error.status ?? 400
      const message = error.message ?? 'An error occurred'
      res.status(status).json(formatErrorResponse(message, status))
    }
  }
}
