/**
 * Ledger API Source Code.
 *
 * @license MIT
 * @copyright Toan Nguyen
 */

import { AuthenticationException } from '@adonisjs/auth/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class WrongCredentialsException extends AuthenticationException {
  /**
   * Overwrite the default
   */
  public async handle(error: this, ctx: HttpContextContract) {
    ctx.response.status(error.status).send({
      code: 'E_WRONG_CREDENTIALS',
      message: 'Your email or your password is not correct',
    })
  }
}
