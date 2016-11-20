'use strict'

const Schema = use('Schema')

class MoviesTableSchema extends Schema {

  up () {
    this.create('movies', (table) => {
      table.increments()
      table.string('title', 80).unique() //cim
      table.string('director', 80) //rendezo
      table.text('content', 500) //leiras
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('category_id').unsigned().references('id').inTable('categories') //mufaj
      table.integer('sum')
      table.integer('count')
      table.integer('rating')
      table.string('image', 250)
      table.timestamps()
    })
  }

  down () {
    this.drop('movies')
  }

}

module.exports = MoviesTableSchema
