import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    return knex.schema
    .table('followers', function (table) {
        table.renameColumn('follower', 'follower_id');
        table.renameColumn('followee', 'followee_id');
    })
}


export async function down(knex: Knex): Promise<any> {
    return knex.schema
    .dropTable("notificiations");
}

