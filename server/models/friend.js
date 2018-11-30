const knex = require('../db/client');

module.exports = class Friend {
    static async sendRequest(userOne, userTwo) {
        return knex('friends').insert({
            userOne,
            userTwo,
            actionUser: userOne,
            status: 'sent',
        });
    }

    static async getRequests(userTwo) {
        return knex('friends').where({ userTwo, status: 'sent' })
            .join('users', { 'friends.actionUser': 'users.id' })
            .select('users.username', 'users.id');
    }

    static async update(userOne, userTwo, actionUser, status) {
        return knex('friends').where({ userOne, userTwo })
            .update({ actionUser, status }).then();
    }
};
