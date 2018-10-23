// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'sublevo',
      username: 'ziggy',
      password: 'yeezy'
    },
    migration: {
      tableName: 'migrations',
      directory: './db/migrations'
    }
  }
};
