import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    return knex.schema
    .createTable('posts', function (table) {
       table.increments('id');
       table.integer('network_id').notNullable();
       table.text('content').nullable();
       table.integer('profile_id').notNullable();
       table.jsonb('interactions').nullable();
       table.timestamps();
    })
}


export async function down(knex: Knex): Promise<any> {
    return knex.schema
    .dropTable("posts");
}

