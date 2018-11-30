const knex = require('./db/client');

knex('friends').where({ status: 'accepted' }).update({ status: 'sent', actionUser: 2 }).then();
