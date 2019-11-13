import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    return knex.schema
    .table('blocked_profiles', function (table) {
        table.renameColumn('banner_id', 'blocker_id');
        table.renameColumn('bannee_id', 'blockee_id');
    })
}


export async function down(knex: Knex): Promise<any> {

}

