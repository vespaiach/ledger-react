/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes/index.ts` as follows
|
| import './cart'
| import './customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    Route.get('expenses/:id', 'ExpensesController.detail')
    Route.put('expenses/:id', 'ExpensesController.update')
    Route.delete('expenses/:id', 'ExpensesController.delete')
    Route.get('expenses/count', 'ExpensesController.total')
    Route.get('expenses', 'ExpensesController.index')
    Route.post('expenses', 'ExpensesController.store')

    Route.get('incomes/:id', 'IncomesController.detail')
    Route.put('incomes/:id', 'IncomesController.update')
    Route.delete('incomes/:id', 'IncomesController.delete')
    Route.get('incomes/count', 'IncomesController.total')
    Route.get('incomes', 'IncomesController.index')
    Route.post('incomes', 'IncomesController.store')

    Route.get('incomes_categories', 'IncomeCategoriesController.list')
    Route.get('expenses_categories', 'ExpenseCategoriesController.list')

    Route.get('statistics/sum', 'StatisticsController.sum')
    Route.get('statistics/total', 'StatisticsController.total')
    Route.get('statistics/latest_month', 'StatisticsController.getMinMonth')

    Route.get('me', 'UsersController.me')
    Route.get('logout', 'UsersController.logout')
  }).middleware('auth')

  Route.post('signin', 'UsersController.login')
  Route.post('signup', 'UsersController.register')
  Route.post('recovery', 'UsersController.recovery')
})
  .prefix('api')
  .where('id', /^[0-9]+$/)

Route.get('/*', async ({ view }) => {
  return view.render('home')
})
