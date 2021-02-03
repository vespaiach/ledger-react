import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class MergeInExes extends BaseSchema {
  protected tableName = 'transactions'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.dateTime('date').notNullable()
      table.decimal('amount', 11, 2).notNullable()
      table.string('description', 255).notNullable()
      table.string('category', 63).notNullable()
      table.enum('transaction_type', ['ex', 'in']).notNullable()
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
