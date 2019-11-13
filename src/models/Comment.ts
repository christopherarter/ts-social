import { Model } from 'objection';
import db from '../database/Database';
import Profile from './Profile';

Model.knex(db);
async function createSchema() {
    // await db.schema.createTable('profiles', table => {
    //     table.increments('id').primary();
    //     table.integer('userId').references('users.id');
    //     table.string('cover_image').nullable();
    //     table.string('profile_image').nullable();
    //     table.dateTime('createdAt');
    //     table.dateTime('updatedAt');
    //     table.text('description').nullable();
    //     table.string('location').nullable();
    //   });

    // await db.schema.createTable('users', table => {
    //     table.increments('id').primary();
    //     table.string('email').unique();
    //     table.string('password');
    //     table.dateTime('lastLogin').nullable();
    //     table.dateTime('createdAt')
    //     table.dateTime('updatedAt').nullable();
    //     table.boolean('emailConfirmed').defaultTo(false);
    //     table.integer('profileId').references('profiles.id');
    //     table.date('birthday');
  
    //   });

    // // Create database schema. You should use knex migration files
    // // to do this. We create it here for simplicity.
    // await db.schema.createTable('comments', table => {
    //   table.increments('id').primary();
    //   table.integer('postId').references('posts.id');
    //   table.integer('usersId').references('users.id');
    //   table.text('content');

    // });

    await db.schema.alterTable('comments', table => {
        table.renameColumn('userId', 'profileId');
    })
  }

//   createSchema();
class Comment extends Model  {

    public content: string;

    static get tableName() {
        return 'comments';
      }
      static get jsonSchema() {
        return {
          type: 'object',
          required: ['content'],
          properties: {
            content: {type:'string'},
          }
        };
      }
      static get relationMappings() {
        return {
          profile: { 
            relation: Model.BelongsToOneRelation,
            modelClass: Profile,
            join: {
              // from: 'comments.profile_id',
              // to: 'profiles.id'
              from: 'profiles.id',
              to: 'comments.profile_id'
            }
          }
        };
      }
}

export default Comment;