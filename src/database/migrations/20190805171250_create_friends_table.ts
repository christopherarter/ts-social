import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    return knex.schema
    .createTable('followers', function (table) {
       table.increments('id').primary();
       table.integer('followee').notNullable();
       table.integer('follower').notNullable();
       table.string('model').defaultTo('profile');
       table.timestamps();
    })
}


export async function down(knex: Knex): Promise<any> {
    return knex.schema
    .dropTable("followers");
}

