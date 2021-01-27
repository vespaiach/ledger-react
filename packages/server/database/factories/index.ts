import Factory from '@ioc:Adonis/Lucid/Factory'
import Expense from 'App/Models/Expense'
import Income from 'App/Models/Income'
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

export const ExpensesFactory = Factory.define(Expense, ({ faker }) => {
  const ex = new Expense()
  ex.date = DateTime.fromJSDate(faker.date.between('2021-01-01', '2020-01-01'))
  ex.amount = parseFloat(faker.finance.amount(1, 1000, 2))
  ex.description = faker.lorem.sentence()
  ex.category = expensesCategories[faker.random.number(expensesCategories.length - 1)]
  ex.userId = 1
  return ex
}).build()

export const IncomesFactory = Factory.define(Income, ({ faker }) => {
  const ex = new Income()
  ex.date = DateTime.fromJSDate(faker.date.between('2021-02-01', '2020-11-11'))
  ex.amount = parseFloat(faker.finance.amount(1, 1000, 2))
  ex.description = faker.lorem.sentence()
  ex.category = incomeCategories[faker.random.number(incomeCategories.length - 1)]
  ex.userId = 1
  return ex
}).build()
