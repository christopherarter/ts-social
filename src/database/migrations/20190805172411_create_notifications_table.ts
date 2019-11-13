import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    return knex.schema
    .createTable('notificiations', function (table) {
       table.increments('id').primary();
       table.string('type').defaultTo('default');
       table.integer('profile_id').notNullable();
       table.jsonb('payload').nullable();
       table.timestamps();
    })
}


export async function down(knex: Knex): Promise<any> {
    return knex.schema
    .dropTable("notificiations");
}

