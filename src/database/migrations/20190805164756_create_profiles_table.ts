import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    return knex.schema
    .createTable('profiles', function (table) {
       table.increments('id');
       table.integer('user_id');
       table.integer('network_id');
       table.string('role').defaultTo('member');
       table.text('description').nullable();
       table.string('location').nullable();
       table.string('profile_image').nullable();
       table.string('cover_image').nullable();
       table.timestamps();
    })
}


export async function down(knex: Knex): Promise<any> {
    return knex.schema
    .dropTable("profiles");
}

