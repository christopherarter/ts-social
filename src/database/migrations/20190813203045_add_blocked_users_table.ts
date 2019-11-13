import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    return knex.schema
    .createTable('blocked_profiles', function (table) {
       table.increments('id').primary();
       table.integer('banner_id').notNullable();
       table.integer('bannee_id').notNullable();
       table.timestamps();
    })
}


export async function down(knex: Knex): Promise<any> {
    return knex.schema
    .dropTable("blocked_profiles");
}
