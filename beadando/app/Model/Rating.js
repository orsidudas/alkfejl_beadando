'use strict'

const Lucid = use('Lucid')

class Rating extends Lucid {

    movie () {
        return this.belongsTo('App/Model/Movie')
    }

}

module.exports = Rating
