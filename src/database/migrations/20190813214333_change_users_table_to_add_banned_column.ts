import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    return knex.schema
    .table('users', function (table) {
        table.json('blocked_users').nullable();
    })
}


export async function down(knex: Knex): Promise<any> {
}

