/**
 * Ledger API Source Code.
 *
 * @license MIT
 * @copyright Toan Nguyen
 */

import { AuthenticationException } from '@adonisjs/auth/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UnAuthorizedException extends AuthenticationException {
  /**
   * Overwrite the default AuthenticationException
   */
  public async handle(error: this, ctx: HttpContextContract) {
    ctx.response.status(error.status).send({
      code: 'E_UNAUTHORIZED',
      message: 'You has not been authorized',
    })
  }
}
