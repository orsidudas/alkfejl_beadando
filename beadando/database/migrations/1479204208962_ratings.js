'use strict'

const Schema = use('Schema')

class RatingsTableSchema extends Schema {

  up () {
    this.create('ratings', (table) => {
      table.increments()
      table.timestamps()
      table.integer('value')  //osszertek
      table.integer('count')  //osszes ertekelo szama
      table.integer('result') //eredmeny
    })
  }

  down () {
    this.drop('ratings')
  }

}

module.exports = RatingsTableSchema
