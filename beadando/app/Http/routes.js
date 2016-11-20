'use strict'

const Route = use('Route')

Route.get('/', 'MovieController.index')
Route.get('/movie/create', 'MovieController.create').middleware('auth')
Route.post('/movie/create', 'MovieController.store').middleware('auth')
Route.get('/movie/:id', 'MovieController.show').middleware('auth')
Route.get('/movie/:id/edit', 'MovieController.edit').middleware('auth')
Route.post('/movie/:id/edit', 'MovieController.postEdit').middleware('auth')
Route.get('/movie/:id/delete', 'MovieController.delete').middleware('auth')
Route.get('/:id/category', 'MovieController.category')


Route.get('/registration', 'UserController.registration')
Route.post('/registration', 'UserController.postRegistration')

Route.get('/login', 'UserController.login')
Route.post('/login', 'UserController.postLogin')
Route.get('/logout', 'UserController.logout')

Route.post('/movie/:id', 'MovieController.rating').middleware('auth')

Route.get('/profile', 'UserController.profile').middleware('auth')
