const bcrypt = require('bcrypt');
const knex = require('../db/client');

module.exports = class User {
    constructor({ id, email, username, name, isAdmin, password, passwordDigest, createdAt }) {
        this.id = id;
        this.email = email;
        this.username = username;
        this.name = name;
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
        return new User(userRaw);
    }

    static async fetch(username) {
        return knex('users').where({ username }).first();
    }

    static async fetchSeen(id) {
        return knex('seenlive').where({ userId: id }).join('artists', { 'artists.id': 'seenlive.artistId' });
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
