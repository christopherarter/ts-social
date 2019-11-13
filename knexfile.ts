// Update with your config settings.
require('dotenv').config();
module.exports = {

  development: {
    client: "pg",
    connection: {
      port: Number(process.env.DB_PORT),
      host : process.env.DB_HOST,
      user : process.env.DB_USER,
      password : '',
      database : process.env.DB_NAME
    },
    migrations: {
      tableName: 'migrations',
      directory: './src/database/migrations'
    }
  },

  staging: {
    client: "pg",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }

};
