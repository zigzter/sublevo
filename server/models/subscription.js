const knex = require('../db/client');

module.exports = class Subscription {
    constructor(id, userId, type, targetId) {
        this.id = id;
        this.userId = userId;
        this.type = type;
        this.targetId = targetId;
    }

    static async addSubscription(userId, type, targetId, name) {
        return knex('subscriptions').insert({ userId, type, targetId, name });
    }

    static async remove(userId, targetId) {
        return knex('subscriptions').where({ userId, targetId }).del();
    }

    static async get(userId, type) {
        return knex('subscriptions').where({ userId, type });
    }
};
