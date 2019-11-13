import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    return knex.schema
    .createTable('networks', function (table) {
       table.increments('id');
       table.string('name').notNullable();
       table.integer('admin_profile_id');
       table.boolean('public').defaultTo(false);
       table.boolean('visible').defaultTo(false);
       table.text('description').nullable();
       table.string('profile_image').nullable();
       table.string('cover_image').nullable();
       table.timestamps();
    })
}


export async function down(knex: Knex): Promise<any> {
    return knex.schema
    .dropTable("networks");
}

