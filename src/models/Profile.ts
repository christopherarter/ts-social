import { Model } from 'objection';
import db from '../database/Database';
import Post from './Post';
import Comment from './Comment';
import User from './User';


Model.knex(db);

class Profile extends Model  {

    public user_id: number;
    public id: number;

    static get tableName() {
        return 'profiles';
      }
      
      static get relationMappings() {
        return {
          posts: {
            relation: Model.HasManyRelation,
            modelClass: Post,
            join: {
              from: 'profiles.id',
              to: 'posts.profile_id'
            }
          },
          comments: {
            relation: Model.HasManyRelation,
            modelClass: Comment,
            join: {
              from: 'profiles.id',
              to: 'comments.profile_id'
            }
          },

          user: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
              from: 'profiles.user_id',
              to: 'users.id'
            }
          }
        };
      }

      static async followers(id: any) {
        return (await db.queryBuilder()
        .select(['followee_id', 'follower_id']).from('followers')
        .where('followee_id', id))
        .map(result => {
            return result.follower_id
        });
      }
      
}

export default Profile;