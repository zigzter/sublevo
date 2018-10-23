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

    static async find(id) {
        return knex('users').where({ id }).first();
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
