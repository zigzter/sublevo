module.exports = {
    development: {
        client: 'pg',
        connection: {
            database: 'sublevo',
            username: 'ziggy',
            password: 'yeezy'
        },
        migrations: {
            tableName: 'migrations',
            directory: './db/migrations'
        }
    }
};
