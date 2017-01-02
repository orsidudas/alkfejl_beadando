'use strict'

const Movie = use('App/Model/Movie')
const Category = use('App/Model/Category')
const Rating = use('App/Model/Rating')
const Validator = use('Validator')
const Database = use('Database')

class MovieController {

  * index(request, response) {
    const categories = yield Category.all()
    const id = request.param('id');
    const movies = yield Movie.query().orderBy('id', 'desc').fetch() //utoljara hozzaadott a legtetejen

    yield response.sendView('home', {
      categories: categories.toJSON(),
      movies: movies.toJSON()
    });
  }

  * create(request, response) {
    const categories = yield Category.all()
    yield response.sendView('createMovie', {
      categories: categories.toJSON()
    });
  }

  * store(request, response) {
    const movieData = request.only('title', 'director', 'content', 'category_id', 'image')

    const rules = {
      title: 'required|unique:movies', //kotelezo
      director: 'required',
      content: 'required',
      category_id: 'required',
      image: 'required'
    }

    const validation = yield Validator.validate(movieData, rules)

    if (validation.fails()) {
      yield request
        .withOnly('title', 'director', 'content', 'category_id', 'image')
        .andWith({ errors: validation.messages() })
        .flash()

      response.redirect('back')
      return
    }

    movieData.user_id = request.currentUser.id
    const movie = yield Movie.create(movieData)
    movie.sum = 0;
    movie.count = 0;
    movie.rating = 0;

    yield movie.save()

    response.redirect('/')
  }

  * show(request, response) {
    const categories = yield Category.all()
    const movie = yield Movie.find(request.param('id'))
    const ratings = yield movie.ratings().fetch()
    yield movie.related('category').load();
    const userId = request.currentUser.id;

    yield response.sendView('showMovie', {
      movie: movie.toJSON(),
      ratings: ratings.toJSON(),
      user: request.currentUser,
      categories: categories.toJSON()
    })
  }

  * edit(request, response) {
    const categories = yield Category.all()
    const id = request.param('id');
    const movie = yield Movie.find(id);

    if (request.currentUser.id !== movie.user_id) {
      response.unauthorized('Access denied.')
      return
    }

    yield response.sendView('editMovie', {
      categories: categories.toJSON(),
      movie: movie.toJSON(),
      user: request.currentUser
    });
  }

  * postEdit(request, response) {
    const movieData = request.only('title', 'director', 'content', 'category_id', 'image')

    const rules = {
      title: 'required', //kotelezo
      director: 'required',
      content: 'required',
      category_id: 'required',
      image: 'required'
    };

    const validation = yield Validator.validate(movieData, rules)

    if (validation.fails()) {
      yield request
        .withOnly('title', 'director', 'content', 'category_id', 'image')
        .andWith({ errors: validation.messages() })
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
    movie.image = movieData.image;

    yield movie.save()

    response.redirect('/movie/' + id )

  }

  * delete(request, response) {
    const id = request.param('id');
    const movie = yield Movie.find(id);

    if (request.currentUser.id !== movie.user_id) {
      response.unauthorized('Access denied.')
      return
    }

    yield movie.delete()
    
      yield Database
    .table('ratings')
    .where('movie_id', id)
    .delete()

    response.redirect('/')
  }

  * category(request, response) {
    const categories = yield Category.all()
    const id = request.param('id');
    const category = yield Category.find(id);
    const movies = yield category.movies().fetch();

    yield response.sendView('showCategory', {
      category: category.toJSON(),
      movies: movies.toJSON(),
      categories: categories.toJSON()
    });
  }


  * rating(request, response) {
    const id = request.param('id'); //film id-ja
    const rr = request.all()
    const userId = request.currentUser.id //user idja
    const ratingNumber = rr.rating; //hanyast ertekelt

    const movieRating = new Rating();

    movieRating.value = ratingNumber;
    movieRating.user_id = userId;
    movieRating.movie_id = id;

    yield movieRating.save();

    const movie = yield Movie.find(request.param('id'))
    movie.sum = +movie.sum + +ratingNumber;
    movie.count = movie.count + 1;
    movie.rating = movie.sum / movie.count;

    yield movie.save();

    response.redirect('/movie/' + id )

  }

  * ajaxDelete(request, response) {
     const id = request.param('id');
     const movie = yield Movie.find(id);

     if (movie) {
       if (request.currentUser.id !== movie.user_id) {
         response.unauthorized('Access denied.')
         return
       }

       yield movie.delete()
       response.ok({
         success: true
       })
       return
     }else{}

    response.notFound('No movie')
  }


}

module.exports = MovieController

