const bcrypt = require('bcrypt');
const faker = require('faker');

const knex = require('../db/client');
// const User = require('../models/user');
const Attendee = require('../models/attendee');

const attendUsers = async (length) => {
    const comments = await knex('comments').where({ targetType: 'event' });
    const eventIds = comments.map(c => c.targetId);
    const users = await knex('users');
    const userIds = users.map(u => u.id);
    const statuses = ['going', 'interested'];
    eventIds.map(async (eId) => {
        userIds.map((uId) => {
            const status = statuses[Math.floor(Math.random() * 2)];
            Attendee.attend(status, eId, uId)
        })
    });
};


const seedUsers = async (length) => {
    const iterate = Array.from({ length });
    iterate.map(async () => {
        const user = await knex('users').insert({
            email: faker.internet.email(),
            username: faker.internet.userName(),
            name: faker.name.firstName(),
            location: faker.address.city(),
            about: faker.lorem.paragraph(),
            passwordDigest: await bcrypt.hash('longpassword', 10),
        }).returning('*');
    });
};

// seedUsers(30);

attendUsers();
