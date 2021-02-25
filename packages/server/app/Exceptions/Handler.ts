/**
 * Ledger API Source Code.
 *
 * @license MIT
 * @copyright Toan Nguyen
 */

import Logger from '@ioc:Adonis/Core/Logger'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ExceptionCode } from './Code'

export default class ExceptionHandler extends HttpExceptionHandler {
  constructor() {
    super(Logger)
  }

  public async handle(error, ctx: HttpContextContract) {
    if (error.code === ExceptionCode.ValidationFailure) {
      return ctx.response
        .status(400)
        .send({ message: 'Data validation failure', code: ExceptionCode.ValidationFailure })
    }

    return ctx.response
      .status(500)
      .send({ message: 'Unknown error occurred', code: ExceptionCode.InternalServerFailure })
  }

  public report(error) {
    Logger.error(error, error.message, error.code)
  }
}
