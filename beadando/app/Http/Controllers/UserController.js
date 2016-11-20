'use strict'

const User = use('App/Model/User')
const Validator = use('Validator')
const Database = use('Database')
const Hash = use('Hash')
const Category = use('App/Model/Category')

class UserController {
  * registration(request, response) {
    const categories = yield Category.all()
    const isLoggedIn = yield request.auth.check()
    if (isLoggedIn) {
      response.redirect('/')
    }

    yield response.sendView('registration', {
      categories: categories.toJSON(),
    });
  }

  *postRegistration(request, response) {
    const registrationData = request.only('username', 'email', 'password', 'password_confirm')

    const rules = {
      username: 'required|alpha_numeric|unique:users',
      email: 'required|email|unique:users',
      password: 'required|min:4',
      password_confirm: 'required|same:password',
    };

    const validation = yield Validator.validateAll(registrationData, rules)

    if (validation.fails()) {
      yield request
        .withOnly('username', 'email', 'password', 'password_confirm')
        .andWith({ errors: validation.messages() })
        .flash()

      response.redirect('back')
      return
    }

    const user = new User()

    user.username = registrationData.username;
    user.email = registrationData.email;
    user.password = yield Hash.make(registrationData.password)
    yield user.save()

    // yield request.auth.login(user)

    response.redirect('/login')
  }

  * login(request, response) {
    const categories = yield Category.all()
    const isLoggedIn = yield request.auth.check()
    if (isLoggedIn) {
      response.redirect('/')
    }

    yield response.sendView('login', {
      categories: categories.toJSON()
    });
  }

  * postLogin(request, response) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      const login = yield request.auth.attempt(email, password)

      if (login) {
        response.redirect('/')
        return
      }
    }
    catch (err) {
      yield request
        .withOnly('email', 'password')
        .andWith({
          errors: [
            {
              message: 'Invalid credentails'
            }
          ]
        })
        .flash()

      response.redirect('/login')
    }
  }


  *logout(request, response) {
    yield request.auth.logout()
    response.redirect('/')
  }


  * profile(request, response) {
    const categories = yield Category.all()
    const userId = request.currentUser.id
    const user = yield User.find(userId)
    const movies = yield user.movies().fetch();

    yield response.sendView('profile', {
      movies: movies.toJSON(),
      user: request.currentUse,
      categories: categories.toJSON()
    });
  }

}

module.exports = UserController
