import Joi from 'joi'
import express from 'express'

export default class ExampleValidator {
  public static validateGetExample = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const joiSchema = Joi.object().keys({
      id: Joi.string().max(500).required(),
    })

    const { error } = joiSchema.validate(request.params)
    if (error) {
      const errorResp = {
        message: error.message,
      }
      response.status(400).send(errorResp)
    } else {
      next()
    }
  }

  public static validateSearchExamples = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const joiSchema = Joi.object().keys({
      ids: Joi.array().required(),
    })

    const { error } = joiSchema.validate(request.body)
    if (error) {
      const errorResp = {
        message: error.message,
      }
      response.status(400).send(errorResp)
    } else {
      next()
    }
    next()
  }
}
