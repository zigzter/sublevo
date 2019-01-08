const knex = require('../db/client');

module.exports = class Attendee {
    static async attend(status, eventId, userId) {
        const attending = await knex('attendees').where({ eventId, userId }).first();
        if (attending) {
            return Promise.all([
                knex('attendees').where({ eventId, userId }).update({ status }),
                knex('notifications').insert({ userId, type: 'attend', targetId: eventId }),
            ]);
        }
        return Promise.all([
            knex('attendees').insert({ status, eventId, userId }),
            knex('notifications').insert({ userId, type: 'attend', targetId: eventId }),
        ]);
    }

    static async fetchAll(eventId) {
        return knex('attendees').where({ eventId })
            .join('users', { 'users.id': 'attendees.userId' })
            .select('users.username', 'users.avatar', 'attendees.status', 'users.id');
    }
};
