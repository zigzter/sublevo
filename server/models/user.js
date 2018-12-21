const bcrypt = require('bcrypt');
const knex = require('../db/client');

module.exports = class User {
    constructor({ id, email, username, name, about, location, isAdmin, password, passwordDigest, createdAt }) {
        this.id = id;
        this.email = email;
        this.username = username;
        this.name = name;
        this.about = about;
        this.location = location;
        this.isAdmin = isAdmin;
        this.password = password;
        this.passwordDigest = passwordDigest;
        this.createdAt = createdAt;
    }

    static async findById(id) {
        return knex('users').where({ id }).first();
    }

    static async find(type, input) {
        const userRaw = await knex('users').where(`${ type }`, input).first();
        if (!userRaw) {
            return undefined;
        }
        return new User(userRaw);
    }

    static async fetch(username) {
        return knex('users').whereRaw("LOWER(username) LIKE '%' || LOWER(?) || '%' ", username).first();
    }

    static async fetchByEmail(email) {
        return knex('users').where({ email }).first();
    }

    static async fetchSeen(id) {
        return knex('seenlive').where({ userId: id }).join('artists', { 'artists.id': 'seenlive.artistId' }).orderBy('seenCount', 'desc');
    }

    static async updateSeenCount(artistId, userId, seenCount) {
        return knex('seenlive').where({
            userId,
            artistId,
        }).update({ seenCount }).then();
    }

    static async addSeen(userId, artistId) {
        return knex('seenlive').insert({ userId, artistId });
    }

    static async removeSeen(userId, artistId) {
        return knex('seenlive').where({ userId, artistId }).del();
    }

    static async updateInfo(id, name, about, location, avatar) {
        return knex('users').where({ id }).update({ name, about, location, avatar }).then();
    }

    static async fetchNotifications(targetId) {
        return knex('notifications').where({ type: 'comment', targetId })
            .join('users', { 'notifications.userId': 'users.id' })
            .select('users.username', 'users.avatar', 'notifications.type', 'notifications.createdAt', 'notifications.commentId', 'notifications.isRead', 'notifications.id')
            .orderBy('notifications.createdAt', 'desc');
    }

    static async markNotifications(arr) {
        return arr.map(id => knex('notifications').update({ isRead: true }).where({ id }).then());
    }

    async save() {
        const { email, username, name, password } = this;
        const [{ id }] = await knex('users').insert({
            email,
            username,
            name,
            passwordDigest: await bcrypt.hash(password, 10),
        }).returning('*');
        this.id = id;
        return this;
    }

    async authenticate(password) {
        return bcrypt.compare(password, this.passwordDigest);
    }
};
