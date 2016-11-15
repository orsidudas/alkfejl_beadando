'use strict'

const Movie = use('App/Model/Movie')
const Category = use('App/Model/Category')
const Rating = use('App/Model/Rating')
const Validator = use('Validator')
const Database = use('Database')

class MovieController {

  * index (request, response) {
    const categories = yield Category.all()
    const id = request.param('id');
    const movies = yield Movie.query().orderBy('id', 'desc').fetch() //utoljara hozzaadott a legtetejen
    
    yield response.sendView('home', {
      categories: categories.toJSON(),
      movies: movies.toJSON()
    });
  }
  
  * create (request, response) {
    const categories = yield Category.all()
    yield response.sendView('createMovie', {
      categories: categories.toJSON()
    });
  }

  * store (request, response) {
    const movieData = request.only('title','director', 'content', 'category_id') 

    const rules = {
      title: 'required', //kotelezo
      director: 'required',
      content: 'required',
      category_id: 'required'
    }

    const validation = yield Validator.validate(movieData, rules) 

    if (validation.fails()) {
      yield request
         .withOnly('title','director', 'content', 'category_id')
        .andWith({ errors: validation.messages() })
        .flash() 

      response.redirect('back')
      return
    }

    const rating = yield Rating.create({ value: 0, count: 0, result: 0 })
    const movie = yield Movie.create(movieData) 
        
    rating.movie_id = movie.id;

    yield rating.save()

    response.redirect('/')
  }
  
  * show (request, response) {
    const movie = yield Movie.find(request.param('id'))
    yield movie.related('category').load();
    yield response.sendView('showMovie', { movie: movie.toJSON() })
  }

  * edit (request, response) {
    const categories = yield Category.all()
    const id = request.param('id');
    const movie = yield Movie.find(id);

    yield response.sendView('editMovie', {
      categories: categories.toJSON(),
      movie: movie.toJSON()
    });
  }

    * postEdit (request, response) {
    const movieData = request.only('title','director', 'content', 'category_id') 

    const rules = {
      title: 'required', //kotelezo
      director: 'required',
      content: 'required',
      category_id: 'required'
    };

    const validation = yield Validator.validate(movieData, rules)

    if (validation.fails()) {
      yield request
        .withOnly('title','director', 'content', 'category_id')
        .andWith({errors: validation.messages()})
        .flash()

      response.redirect('back')
      return
    }

    const id = request.param('id');
    const movie = yield Movie.find(id);

    
    movie.title = movieData.title;
    movie.director = movieData.director; 
    movie.content = movieData.content;
    movie.category_id = movieData.category_id;

    yield movie.save()
    
    response.redirect('/')
  }

  * delete (request, response) {
    const id = request.param('id');
    const movie = yield Movie.find(id);

    yield movie.delete()
    response.redirect('/')
  }

  * category (request, response) {
    const id = request.param('id');
    const category = yield Category.find(id);    
    const movies = yield category.movies().fetch();
    
    yield response.sendView('showCategory', {
      category: category.toJSON(),
      movies: movies.toJSON()
    });
  }


  * rating (request, response){
    const id = request.param('id'); //film id-ja
    const rr = request.all()
    const ratingNumber = rr.rating; 

    const movie = yield Movie.find(id);
    const movieRating = yield movie.rating().fetch()

    movieRating.value = +movieRating.value + +ratingNumber;  //ha nem teszel pluszt, akkor stringkent egymas melle irja
    movieRating.count = movieRating.count + 1;
    movieRating.result = movieRating.value/movieRating.count;

    yield movieRating.save();

    response.redirect('/')

  }


}

module.exports = MovieController

