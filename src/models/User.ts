import { Model } from 'objection';
import db from '../database/Database';
import Profile from './Profile';


Model.knex(db);

class User extends Model  {

  public password: string;
  public email: string;
  public email_confirmed: boolean;
  public blocked_users: any;

    static get tableName() {
        return 'users';
      }
    //   static get jsonSchema() {
    //     return {
    //       type: 'object',
    //       required: [
    //           'first_name',
    //           'last_name',
    //           'email'
    //         ],
    //       properties: {
    //         id: {type: 'integer'},
    //         first_name: {type: 'string'},
    //         last_name: {type: 'string'},
    //         email: {type: 'string'},
    //         content: {type:'string'},
    //       }
    //     };
    //   }
      static get relationMappings() {
        return {
          profile: {
            relation: Model.HasManyRelation,
            modelClass: Profile,
            join: {
              from: 'profile.id',
              to: 'user.profile_id'
            }
          }
        };
      }
}

export default User;