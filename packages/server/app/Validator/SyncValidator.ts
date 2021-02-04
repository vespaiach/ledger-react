/**
 * Ledger API Source Code.
 *
 * @license MIT
 * @copyright Toan Nguyen
 *
 *
 *
 * Payload schema
 * [
 *   {
 *      id: number | undefined,
 *      date: DateTime,
 *      amount: number,
 *      description: string,
 *      category: string
 *   }
 *   ...
 * ]
 */

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class SyncValidator {
  constructor(private ctx: HttpContextContract) {}

  public schema = schema.create({
    payload: schema.array().members(
      schema.object().members({
        id: schema.number.optional(),
        date: schema.date({ format: 'iso' }),
        amount: schema.number(),
        description: schema.string({ escape: true, trim: true }, [rules.maxLength(255)]),
        category: schema.string({ escape: true, trim: true }, [rules.maxLength(63)]),
        transactionType: schema.string({ escape: true, trim: true }, [rules.transactionType()]),
      })
    ),
  })

  /**
   * The `schema` first gets compiled to a reusable function and then that compiled
   * function validates the data at runtime.
   *
   * Since, compiling the schema is an expensive operation, you must always cache it by
   * defining a unique cache key. The simplest way is to use the current request route
   * key, which is a combination of the route pattern and HTTP method.
   */
  public cacheKey = this.ctx.routeKey

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   */
  public messages = {}
}
