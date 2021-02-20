import { BaseCommand, args } from '@adonisjs/ace'

export default class CreateUser extends BaseCommand {
  /**
   * Command Name is used to run the command
   */
  public static commandName = 'create:owner'

  /**
   * Command Name is displayed in the "help" output
   */
  public static description = 'Create an owner account for web application: "Ledger"'

  /**
   * Owner's email.
   */
  @args.string({ description: 'Email of owner' })
  public email: string

  /**
   * Bootstrap app.
   */
  public static settings = {
    loadApp: true,
  }

  /**
   * Account password.
   */
  @args.string({ description: 'Account password' })
  public password: string

  public async run(): Promise<void> {
    const User = this.application.container.use('App/Models/User')
    const user = new User.default()
    user.email = this.email
    user.password = this.password
    await user.save()
    this.logger.success(`Account has been created for "${this.email}"`)
  }
}
