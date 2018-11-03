const knex = require('../db/client');

module.exports = class Comment {
    constructor({ id, authorId, profileId, content, createdAt }) {
        this.id = id;
        this.authorId = authorId;
        this.profileId = profileId;
        this.content = content;
        this.createdAt = createdAt;
    }

    static async fetch(profileId) {
        return knex('comments').where({ profileId })
            .join('users', { 'comments.authorId': 'users.id' })
            .select('comments.id', 'comments.content', 'users.username')
            .orderBy('comments.createdAt', 'desc');
    }

    static async fetchById(id) {
        const rawComment = await knex('comments').where({ id }).first();
        return new Comment(rawComment);
    }

    async save() {
        const { authorId, profileId, content } = this;
        const [{ id }] = await knex('comments').insert({
            authorId,
            profileId,
            content,
        }).returning('*');
        this.id = id;
        return this;
    }

    async destroy() {
        const { id } = this;
        await knex('comments').where({ id }).del();
        return this;
    }
};
