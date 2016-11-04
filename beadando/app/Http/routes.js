'use strict'

const Route = use('Route')

Route.on('/').render('home')
Route.on('/registration').render('registration')
Route.on('/login').render('login')
