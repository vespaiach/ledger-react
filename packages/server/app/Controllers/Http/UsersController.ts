import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Hash from '@ioc:Adonis/Core/Hash'
import Mail from '@ioc:Adonis/Addons/Mail'
import Env from '@ioc:Adonis/Core/Env'
import { DateTime } from 'luxon'
import User from 'App/Models/User'
import { base64 } from '@poppinss/utils'

export default class UsersController {
  /**
   * Login user via session and return logined user account
   */
  public async signin({ request, auth }: HttpContextContract) {
    const { email, password, remember } = await request.validate({
      schema: schema.create({
        email: schema.string({ trim: true }, [rules.email()]),
        password: schema.string({ trim: true }),
        remember: schema.boolean.optional(),
      }),
    })

    await auth.attempt(email, password, remember)

    return auth.user
  }

  /**
   * Logout
   */
  public async logout({ auth }: HttpContextContract) {
    await auth.logout()
    return
  }

  /**
   * Use this to check if login session is still valid
   */
  public async ping() {
    return 'pong'
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
