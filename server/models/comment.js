const knex = require('../db/client');

module.exports = class Comment {
    constructor({ id, authorId, targetId, content, createdAt }) {
        this.id = id;
        this.authorId = authorId;
        this.targetId = targetId;
        this.content = content;
        this.createdAt = createdAt;
    }

    static async fetch(targetId) {
        return knex('comments').where({ targetId })
            .join('users', { 'comments.authorId': 'users.id' })
            .select('comments.id', 'comments.content', 'users.username', 'comments.createdAt')
            .orderBy('comments.createdAt', 'desc');
    }

    static async fetchById(id) {
        const rawComment = await knex('comments').where({ id }).first();
        return new Comment(rawComment);
    }

    async save() {
        const { authorId, targetId, targetType, content } = this;
        const [{ id, createdAt }] = await knex('comments').insert({
            authorId,
            targetId,
            targetType,
            content,
        }).returning('*');
        this.id = id;
        this.createdAt = createdAt;
        return this;
    }

    async destroy() {
        const { id } = this;
        await knex('comments').where({ id }).del();
        return this;
    }
};
