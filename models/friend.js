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

    static async get(user) {
        const subquery = knex('friends').select('userTwo as friendId').where({ userOne: user }).andWhere({ status: 'accepted' })
            .union(function () {
                return this.select('userOne as friendId').from('friends').where({ userTwo: user }).andWhere({ status: 'accepted' })
            }).as('friendsIds');
        return knex(subquery).join('users', { 'friendsIds.friendId': 'users.id' }).select('users.username', 'users.avatar', 'users.id');
    }
};
