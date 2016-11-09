'use strict'

const Route = use('Route')

Route.get('/', 'MovieController.index')
Route.get('/movie/create', 'MovieController.create')
Route.post('/movie', 'MovieController.store')
Route.get('/movie/:id', 'MovieController.show')
Route.get('/movie/:id/edit', 'MovieController.edit')
Route.post('/movie/:id/edit', 'MovieController.postEdit')

Route.on('/registration').render('registration')
Route.on('/login').render('login')
