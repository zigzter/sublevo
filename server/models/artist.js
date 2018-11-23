const knex = require('../db/client');

module.exports = class Artist {
    constructor({ id, name, spotifyId, artistImage }) {
        this.id = id;
        this.name = name;
        this.spotifyId = spotifyId;
        this.artistImage = artistImage;
    }

    static async saveDb(name, spotifyId, artistImage) {
        return knex('artists').insert({
            name,
            spotifyId,
            artistImage,
        }).returning('*');
    }

    static async fetch(spotifyId) {
        return knex('artists').where({ spotifyId }).first();
    }
};
