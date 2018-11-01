const knex = require('../db/client');

module.exports = class Comment {
    constructor({ id, author, profile, content, createdAt }) {
        this.id = id;
        this.author = author;
        this.profile = profile;
        this.content = content;
        this.createdAt = createdAt;
    }

    static async fetch(profile) {
        return knex('comments').where({ profile }).orderBy('createdAt', 'desc');
    }

    async save() {
        const { author, profile, content } = this;
        const [{ id }] = await knex('comments').insert({
            author,
            profile,
            content,
        }).returning('*');
        this.id = id;
        return this;
    }
};
