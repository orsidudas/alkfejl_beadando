'use strict'

const Lucid = use('Lucid')

class User extends Lucid {

  apiTokens () {
    return this.hasMany('App/Model/Token')
  }

  movies () {
    return this.hasMany('App/Model/Movie')
  }

  ratings () {
    return this.hasMany('App/Model/Rating')
  }
}

module.exports = User
