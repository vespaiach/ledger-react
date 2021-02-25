/**
 * Ledger API Source Code.
 *
 * @license MIT
 * @copyright Toan Nguyen <nta.toan@gmail.com>
 *
 */

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Hash from '@ioc:Adonis/Core/Hash'
import Mail from '@ioc:Adonis/Addons/Mail'
import Env from '@ioc:Adonis/Core/Env'
import { base64 } from '@poppinss/utils'
import { DateTime } from 'luxon'

import User from 'App/Models/User'
import WrongCredentialsException from 'App/Exceptions/WrongCredentialsException'
import { ExceptionCode } from 'App/Exceptions/Code'
import InternalServerException from 'App/Exceptions/InternalServerException'

export default class UsersController {
  /**
   * Exchange email & password for opaque token
   */
  public async signin({ request, auth }: HttpContextContract) {
    const { email, password } = await request.validate({
      schema: schema.create({
        email: schema.string({ trim: true }, [rules.email()]),
        password: schema.string({ trim: true }),
      }),
    })

    try {
      const token = await auth.use('api').attempt(email, password)
      return token.toJSON()
    } catch (error) {
      throw new WrongCredentialsException(
        'Wrong credentials',
        ExceptionCode.WrongCredentialFailure,
        { error, email }
      )
    }
  }

  /**
   * Sign out token
   */
  public async signout({ auth }: HttpContextContract) {
    try {
      await auth.use('api').logout()
    } catch (error) {
      throw new InternalServerException('Server failed', ExceptionCode.InternalServerFailure, {
        error,
      })
    }
    return
  }

  /**
   * Recovery password
   */
  public async recovery({ request, response }: HttpContextContract) {
    const { email, token, password } = await request.validate({
      schema: schema.create({
        email: schema.string({ trim: true }, [rules.email()]),
        token: schema.string.optional(),
        password: schema.string.optional({ trim: true }, [rules.minLength(8)]),
      }),
      messages: {
        'email.required': 'email is required',
        'email.email': 'email is invalid',
      },
    })

    const user = await User.findByOrFail('email', email)
    if (token && password) {
      if (
        token === user.recoveryToken &&
        user.createdTokenAt &&
        user.createdTokenAt.diffNow().milliseconds < 10 * 60 * 1000
      ) {
        user.password = password
        await user.save()
      }
    } else {
      user.recoveryToken = base64.encode(await Hash.make(Date.now().toString()))
      user.createdTokenAt = DateTime.fromMillis(Date.now())
      await user.save()

      await Mail.send((message) => {
        message
          .from('vespaiach@yahoo.com')
          .to(email)
          .subject('Password Recovery!')
          .htmlView('emails/recovery', {
            url: `${Env.get('RECOVERY_PASSWORD_URL', 'https://www.vespaiach.com/recovery')}?token=${
              user.recoveryToken
            }`,
          })
      })
    }

    return response.status(204)
  }
}
