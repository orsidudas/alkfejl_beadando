'use strict'

const Movie = use('App/Model/Movie')
const Category = use('App/Model/Category')
const Validator = use('Validator')
const Database = use('Database')

class MovieController {

  * index (request, response) {
    const movies = yield Movie.query().orderBy('id', 'desc').fetch() //utoljara hozzaadott a legtetejen
    yield response.sendView('home', { movies: movies.toJSON() })
  }
  
  * create (request, response) {
    const categories = yield Category.all()
    yield response.sendView('createMovie', {
      categories: categories.toJSON()
    });
  }

  * store (request, response) {
    const movieData = request.only('title', 'content', 'category_id') 

    const rules = {
      title: 'required', //kotelezo
      content: 'required',
      category_id: 'required'
    }

    const validation = yield Validator.validate(movieData, rules) 

    if (validation.fails()) {
      yield request
         .withOnly('title', 'content', 'category_id')
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

