const knex = require('../db/client');

module.exports = class Attendee {
    static async attend(status, eventId, userId) {
        const attending = await knex('attendees').where({ eventId, userId }).first();
        if (attending) {
            return knex('attendees').where({ eventId, userId }).update({ status });
        }
        return knex('attendees').insert({ status, eventId, userId });
    }

    static async fetchAll(eventId) {
        return knex('attendees').where({ eventId })
            .join('users', { 'users.id': 'attendees.userId' })
            .select('users.username', 'users.avatar', 'attendees.status', 'users.id');
    }
};
