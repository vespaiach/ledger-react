/**
 * Ledger API Source Code.
 *
 * @license MIT
 * @copyright Toan Nguyen
 */

import BaseException from 'App/Exceptions/BaseException'

/**
 * Server exception.
 */
export default class InternalServerException extends BaseException {
  constructor(message: string, code: string, real: any) {
    super(500, message, code, real)
  }
}
