/**
 * Ledger API Source Code.
 *
 * @license MIT
 * @copyright Toan Nguyen
 *
 */

import BaseException from 'App/Exceptions/BaseException'

/**
 * Unable to save/delete/update records.
 */
export default class UnprocesableException extends BaseException {
  constructor(message: string, code: string, real: any) {
    super(422, message, code, real)
  }
}
