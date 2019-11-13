import { Model } from 'objection';
import db from '../database/Database';
import Comment from './Comment';
import Profile from './Profile';

Model.knex(db);

class Network extends Model  {

    public title: string;
    public content: string;

    static get tableName() {
        return 'networks';
      }
    //   static get jsonSchema() {
    //     return {
    //       type: 'object',
    //       required: ['content'],
    //       properties: {
    //         id: {type: 'integer'},
    //         title: {type: 'string'},
    //         content: {type:'string'},
    //       }
    //     };
    //   }
      static get relationMappings() {
        return {
          members: {
              relation: Model.HasManyRelation,
              modelClass: Profile,
              join: {
                  from: 'profiles.network_id',
                  to: 'networks.id'
              }
          },
          admin: {
            relation: Model.HasOneRelation,
            modelClass: Profile,
            join: {
                from: 'networks.admin_profile_id',
                to: 'profiles.id'
            }
        }
        };
      }
}

export default Network;