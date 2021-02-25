/**
 * Ledger API Source Code.
 *
 * @license MIT
 * @copyright Toan Nguyen
 */

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Exception } from '@poppinss/utils'
import Logger from '@ioc:Adonis/Core/Logger'

export default class BaseException extends Exception {
  /**
   * Real error for logging.
   */
  public real: any

  constructor(status: number, message: string, code: string, real: any) {
    super(message, status, code)
    this.real = real
  }

  public handle(error: this, { response }: HttpContextContract) {
    response.status(error.status).send({
      code: this.code,
      message: this.message,
    })
  }

  public report(error: this) {
    Logger.error(error.real, error.message, error.code)
  }
}
