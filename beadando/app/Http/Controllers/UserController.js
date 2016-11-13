'use strict'

const User = use('App/Model/User')
const Validator = use('Validator')
const Database = use('Database')
const Hash = use('Hash')

class UserController {
    * registration(request, response) {

    yield response.sendView('registration')
  }

  *postRegistration(request, response){
   const registrationData = request.only('username','email', 'password', 'password_confirm') 

    const rules = {
      username: 'required|alpha_numeric|unique:users',
      email: 'required|email|unique:users',
      password: 'required|min:4',
      password_confirm: 'required|same:password',
    };

    const validation = yield Validator.validateAll(registrationData, rules)

    if (validation.fails()) {
      yield request
        .withOnly('username','email', 'password', 'password_confirm') 
        .andWith({errors: validation.messages()})
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

    response.redirect('/')
  }

}

module.exports = UserController
