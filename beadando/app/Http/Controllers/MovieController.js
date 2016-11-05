'use strict'

const Movie = use('App/Model/Movie')
const Validator = use('Validator')

class MovieController {

  * index (request, response) {
    const movies = yield Movie.query().orderBy('id', 'desc').fetch() //utoljara hozzaadott a legtetejen
    yield response.sendView('home', { movies: movies.toJSON() })
  }
  
  * create (request, response) {
    yield response.sendView('createMovie')
  }

  * store (request, response) {
    const movieData = request.only('title', 'content') 

    const rules = {
      title: 'required', //kotelezo
      content: 'required'
    }

    const validation = yield Validator.validate(movieData, rules) 

    if (validation.fails()) {
      yield request
        .withOnly('title', 'content')
        .andWith({ errors: validation.messages() })
        .flash() 

      response.redirect('back')
      return
    }

    yield Movie.create(movieData) 
    response.redirect('/')
  }
  
  * show (request, response) {
    const movie = yield Movie.find(request.param('id'))
    yield response.sendView('showMovie', { movie: movie.toJSON() })
  }
}

module.exports = MovieController

