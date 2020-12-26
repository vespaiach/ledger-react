import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class UsersController {
  /**
   * Login user via session and return logined user account
   */
  public async login({ request, auth }: HttpContextContract) {
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
   * Return user information
   */
  public async me({ auth }: HttpContextContract) {
    return auth.user
  }

  /**
   * Register a new account with
   *  name
   *  email
   *  password
   */
  public async register({ request }: HttpContextContract) {
    const { email, password, name } = await request.validate({
      schema: schema.create({
        name: schema.string({ trim: true }),
        email: schema.string({ trim: true }, [
          rules.email(),
          rules.unique({ column: 'email', table: 'users' }),
        ]),
        password: schema.string({ trim: true }, [rules.minLength(8)]),
      }),
      messages: {
        'name.required': 'name is required',
        'email.required': 'email is required',
        'email.email': 'email is invalid',
        'email.unique': 'email is duplicated',
        'password.required': 'password is required',
        'password.minLength': 'password is not enough 8 characters',
      },
    })

    const user = new User()
    user.name = name
    user.password = password
    user.email = email

    return await user.save()
  }
}
