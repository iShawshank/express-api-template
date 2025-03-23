import express from 'express'

export default class ExampleController {
  public static async getExample(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    try {
      const { id } = req.params
      res.status(200).json({
        data: {
          id,
        },
      })
    } catch (error) { 
      res.status(400).json({
        error: (error as Error).message,
      })
    }
  }

  public static async searchExamples(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    try {
      const { ids } = req.body
      const newIds = ids.map((id) => ({ id }))
      res.status(200).json({
        data: {
          examples: newIds,
        },
      })
    } catch (error) {
      res.status(400).json({
        error: (error as Error).message,
      })
    }
  }
}
