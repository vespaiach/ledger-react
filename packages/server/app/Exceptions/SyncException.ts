/**
 * Ledger API Source Code.
 *
 * @license MIT
 * @copyright Toan Nguyen
 */

import { Exception } from '@poppinss/utils'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

/**
 * Exception when create/update transaction
 */
export default class SyncException extends Exception {
  constructor(message: string) {
    super(message, 422)
  }

  public async handle(error: this, { response }: HttpContextContract) {
    response.status(error.status).send({
      code: 'E_SYNC_FAIL',
      message: 'Something went wrong when updating data',
    })
  }
}
