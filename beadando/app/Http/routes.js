'use strict'

const Route = use('Route')

Route.get('/', 'MovieController.index')
Route.get('/movie/create', 'MovieController.create')
Route.post('/movie', 'MovieController.store')
Route.get('/movie/:id', 'MovieController.show')
Route.get('/movie/:id/edit', 'MovieController.edit')
Route.post('/movie/:id/edit', 'MovieController.postEdit')
Route.get('/movie/:id/delete', 'MovieController.delete')
Route.get('/:id/category', 'MovieController.category')


Route.get('/registration', 'UserController.registration')
Route.post('/registration', 'UserController.postRegistration')

Route.get('/login', 'UserController.login')
Route.post('/login', 'UserController.postLogin')
