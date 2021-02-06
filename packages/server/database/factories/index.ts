/**
 * Ledger API Source Code.
 *
 * @license MIT
 * @copyright Toan Nguyen
 */

import Factory from '@ioc:Adonis/Lucid/Factory'
import Transaction from 'App/Models/Trasactions'
import TransactionType from 'App/Models/TransactionType'
import { DateTime } from 'luxon'

const expensesCategories = [
  'food',
  'gifts',
  'health/medical',
  'home',
  'transportation',
  'personal',
  'pets',
  'utilities',
  'travel',
  'debt',
  'other',
]

const incomeCategories = ['savings', 'paycheck', 'bonus', 'interest', 'other']

export const TransactionsFactory = Factory.define(Transaction, ({ faker }) => {
  const tran = new Transaction()
  tran.date = DateTime.fromJSDate(faker.date.between('2021-01-01', '2020-04-01'))
  tran.amount = parseFloat(faker.finance.amount(1, 100000, 2))
  tran.description = faker.lorem.sentence()
  if (faker.random.boolean()) {
    tran.category = expensesCategories[faker.random.number(expensesCategories.length - 1)]
    tran.transactionType = TransactionType.Expense
  } else {
    tran.category = incomeCategories[faker.random.number(incomeCategories.length - 1)]
    tran.transactionType = TransactionType.Income
  }
  return tran
}).build()
