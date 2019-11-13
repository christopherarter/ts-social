import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    return knex.schema
    .createTable('comments', function (table) {
       table.increments('id');
       table.integer('profile_id').notNullable();
       table.integer('post_id').notNullable();
       table.text('content').nullable();
       table.jsonb('interactions').nullable();
       table.timestamps();
    })
}


export async function down(knex: Knex): Promise<any> {
    return knex.schema
    .dropTable("comments");
}

