/**
 * Ledger API Source Code.
 *
 * @license MIT
 * @copyright Toan Nguyen
 */

import Logger from '@ioc:Adonis/Core/Logger'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ExceptionHandler extends HttpExceptionHandler {
  protected ignoreStatuses = [422]

  constructor() {
    super(Logger)
  }

  public async handle(error, ctx: HttpContextContract) {
    if (error.code === 'E_VALIDATION_FAILURE') {
      return ctx.response.status(400).send({
        code: 'E_VALIDATION_FAILURE',
        message: 'Payload syntax error',
      })
    }

    return super.handle(error, ctx)
  }
}
