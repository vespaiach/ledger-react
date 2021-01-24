import { AuthenticationException } from '@adonisjs/auth/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
/*
|--------------------------------------------------------------------------
| Exception
|--------------------------------------------------------------------------
|
*/
export default class UnAuthorizedException extends AuthenticationException {
  /**
   * Overwrite the default AuthenticationException
   */
  public async handle(error: this, ctx: HttpContextContract) {
    error.respondWithJsonAPI(ctx)
  }
}
