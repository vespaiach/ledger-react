/**
 * Ledger API Source Code.
 *
 * @license MIT
 * @copyright Toan Nguyen
 */

import { validator } from '@ioc:Adonis/Core/Validator'

validator.rule(
  'transactionType',
  (value, _, { pointer, arrayExpressionPointer, errorReporter }) => {
    /**
     * Skip validation when value is not a string. The string
     * schema rule will handle it
     */
    if (typeof value !== 'string') {
      return
    }

    if (value === 'in' || value === 'ex') {
      return
    }

    /**
     * Report error
     */
    errorReporter.report(
      pointer,
      'transactionType',
      'Invalid transaction type ',
      arrayExpressionPointer
    )
  }
)
