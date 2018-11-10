const knex = require('../db/client');

module.exports = class Artist {
    constructor({ id, name, spotifyId }) {
        this.id = id;
        this.name = name;
        this.spotifyId = spotifyId;
    }

    static async saveDb(name, spotifyId) {
        return knex('artists').insert({
            name,
            spotifyId,
        }).returning('*');
    }

    static async fetch(spotifyId) {
        return knex('artists').where({ spotifyId }).first();
    }
};
