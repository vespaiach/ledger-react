/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    Route.get('transactions/:year', 'TransactionsController.get')
    Route.post('transactions', 'TransactionsController.sync')
    Route.get('ping', 'UsersController.ping')
  }).middleware('auth')

  Route.post('signin', 'UsersController.signin')
  Route.post('recovery', 'UsersController.recovery')
})
  .prefix('api')
  .where('year', /^[0-9]+$/)

Route.get('/*', async ({ view }) => {
  return view.render('home')
})
