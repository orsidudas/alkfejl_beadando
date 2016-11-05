'use strict'

const Route = use('Route')

Route.get('/', 'MovieController.index')
Route.get('/movie/create', 'MovieController.create')
Route.post('/movie', 'MovieController.store')
Route.get('/movie/:id', 'MovieController.show')

Route.on('/registration').render('registration')
Route.on('/login').render('login')
