const { body, validationResult } = require('express-validator/check');
const User = require('../models/user');
const Artist = require('../models/artist');
const Comment = require('../models/comment');
const knex = require('../db/client');

const validateUser = [
    body('username').not().isEmpty()
        .withMessage('Please enter a username')
        .custom(async (username) => {
            if (await knex('users').where({ username }).first()) {
                throw new Error('Username is already taken');
            }
        }),
    body('email').not().isEmpty()
        .withMessage('Please enter your email'),
    body('password').isLength({ min: 9 })
        .withMessage('Password must be at least 9 characters'),
    body('passwordConfirmation').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Passwords must match');
        } else {
            return true;
        }
    }),
];

module.exports = {
    new(req, res) {
        res.render('users/new', { user: {} });
    },
    create: [
        validateUser,
        async (req, res, next) => {
            const { username, email, password } = req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.render('users/new', {
                    user: { username, email },
                    errors: errors.array(),
                });
            }
            try {
                const user = new User({ username, email, password });
                await user.save();
                req.session.userId = user.id;
                return res.redirect('/');
            } catch (err) {
                return next(err);
            }
        },
    ],
    async show(req, res) {
        const { username } = req.params;
        const user = await User.fetch(username);
        const comments = await Comment.fetch(user.username);
        const artists = await User.fetchSeen(user.id);
        if (user) {
            res.render('users/show', { user, comments, artists });
        } else {
            res.status(404).send("Page doesn't exist!");
        }
    },
    async edit(req, res) {
        const { username } = req.currentUser;
        const user = await User.fetch(username);
        const artists = await User.fetchSeen(user.id);
        res.render('users/edit', { artists });
    },
    async addArtist(req, res, next) {
        try {
            const { addedArtistName, addedArtistId, username } = req.body;
            const dbUser = await User.fetch(username);
            let dbArtist = await Artist.fetch(addedArtistId);
            if (!dbArtist) {
                [dbArtist] = await Artist.saveDb(addedArtistName, addedArtistId);
            }
            await User.addSeen(dbUser.id, dbArtist.id);
        } catch (err) {
            next(err);
        }
    },
    async updateSeen(req, res, next) {
        try {
            const { id, username, seenCount } = req.body;
            const dbUser = await User.fetch(username);
            await User.updateSeenCount(id, dbUser.id, seenCount);
        } catch (err) {
            next(err);
        }
    },
};
