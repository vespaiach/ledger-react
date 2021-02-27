/**
 * Ledger API Source Code.
 *
 * @license MIT
 * @copyright Toan Nguyen
 */

import BaseException from 'App/Exceptions/BaseException'

export default class UnAuthorizedException extends BaseException {
  constructor(message: string, code: string, real: any) {
    super(401, message, code, real)
  }
}
