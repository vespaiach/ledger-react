/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/

import { validator } from '@ioc:Adonis/Core/Validator'

validator.rule('by', (value, _, { pointer, arrayExpressionPointer, errorReporter }) => {
  /**
   * Skip validation when value is not a string. The string
   * schema rule will handle it
   */
  if (typeof value !== 'string') {
    return
  }

  if (
    value === 'date' ||
    value === '-date' ||
    value === 'amount' ||
    value === '-amount' ||
    value === 'category' ||
    value === '-category'
  ) {
    return
  }

  /**
   * Report error when sorting field is not correct
   */
  errorReporter.report(pointer, 'by', 'Invalid order by', arrayExpressionPointer)
})

validator.rule('type', (value, _, { pointer, arrayExpressionPointer, errorReporter }) => {
  /**
   * Skip validation when value is not a string. The string
   * schema rule will handle it
   */
  if (typeof value !== 'string') {
    return
  }

  if (value === 'expenses' || value === 'incomes') {
    return
  }

  /**
   * Report error
   */
  errorReporter.report(pointer, 'type', 'Invalid type', arrayExpressionPointer)
})
