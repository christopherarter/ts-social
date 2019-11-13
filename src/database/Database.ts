import knex from 'knex';

export default knex({
    client: 'pg',
    connection: {
      port: Number(process.env.DB_PORT),
      host : process.env.DB_HOST,
      user : process.env.DB_USER,
      password : '',
      database : 'postgres'
    }
  });