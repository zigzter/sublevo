const knex = require('../db/client');

module.exports = class Subscription {
    constructor(id, userId, type, targetId) {
        this.id = id;
        this.userId = userId;
        this.type = type;
        this.targetId = targetId;
    }

    static async addSubscription(userId, type, targetId) {
        return knex('subscriptions').insert({ userId, type, targetId })
    }

    static async get(userId, type) {
        return knex('subscriptions').where({ userId, type });
    }
};
