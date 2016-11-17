'use strict'

const Lucid = use('Lucid')

class Rating extends Lucid {

    movie () {
        return this.belongsTo('App/Model/Movie')
    }

    user () {
        return this.belongsTo('App/Model/User')
    }

}

module.exports = Rating
