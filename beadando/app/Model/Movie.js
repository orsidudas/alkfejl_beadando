'use strict'

const Lucid = use('Lucid')

class Movie extends Lucid {
    category () {
     return this.belongsTo('App/Model/Category')
    }
 
    user () {
     return this.belongsTo('App/Model/User')
    }

    rating(){
        return this.hasOne('App/Model/Rating')
    }

}

module.exports = Movie