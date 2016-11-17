'use strict'

const Schema = use('Schema')

class RatingsTableSchema extends Schema {

  up () {
    this.create('ratings', (table) => {
      table.increments()
      table.timestamps()
      table.integer('value')  //ertek
      table.integer('movie_id').unsigned().references('id').inTable('movies') //film
      table.integer('user_id').unsigned().references('id').inTable('users') //felhasznalo
    })
  }

  down () {
    this.drop('ratings')
  }

}

module.exports = RatingsTableSchema
