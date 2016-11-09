'use strict'

const Schema = use('Schema')

class MoviesTableSchema extends Schema {

  up () {
    this.create('movies', (table) => {
      table.increments()
      table.string('title') //cim
      table.string('director') //rendezo
      table.text('content') //leiras
      table.integer('category_id').unsigned().references('id').inTable('categories') //mufaj
      table.integer('rating') //ertekeles
      table.timestamps()
    })
  }

  down () {
    this.drop('movies')
  }

}

module.exports = MoviesTableSchema
