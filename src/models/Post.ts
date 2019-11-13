import { Model } from 'objection';
import db from '../database/Database';
import Comment from './Comment';
import Profile from './Profile';

Model.knex(db);

class Post extends Model  {

    public title: string;
    public content: string;
    public id: number;

    static get tableName() {
        return 'posts';
      }
      static get jsonSchema() {
        return {
          type: 'object',
          required: ['content'],
          properties: {
            content: {type: 'string'},
          }
        };
      }
      static get relationMappings() {
        return {
          comments: {
            relation: Model.HasManyRelation,
            modelClass: Comment,
            join: {
              from: 'posts.id',
              to: 'comments.post_id'
            }
          },
          profile: {
              relation: Model.BelongsToOneRelation,
              modelClass: Profile,
              join: {
                // to: 'profiles.id',
                // from: 'posts.profile_id',
                from: 'profiles.id',
                  to: 'posts.profile_id',
              }
          }
        };
      }
}

export default Post;