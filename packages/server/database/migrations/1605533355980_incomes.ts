import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Incomes extends BaseSchema {
  protected tableName = 'incomes'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.dateTime('date').notNullable()
      table.decimal('amount', 11, 2).notNullable()
      table.string('description', 256).notNullable()
      table.string('category', 32).notNullable()
      table.timestamps(true)
      table.integer('user_id').unsigned().notNullable()
      table.foreign('user_id').references('id').inTable('users')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
