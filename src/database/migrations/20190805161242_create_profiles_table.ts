import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
    return knex.schema
    .createTable('users', function (table) {
       table.increments('id');
       table.string('first_name', 255).notNullable();
       table.string('last_name', 255).notNullable();
       table.string('email').notNullable().unique();
       table.boolean('email_confirmed').defaultTo(false);
       table.string('password').notNullable();
       table.dateTime('created_at').nullable();
       table.dateTime('updated_at').nullable();
       table.dateTime('last_login').nullable();
    })
}


export async function down(knex: Knex): Promise<any> {
    return knex.schema
    .dropTable("users");
}

