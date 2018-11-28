const { body, validationResult } = require('express-validator/check');
const User = require('../models/user');
const Comment = require('../models/comment');
const Subscription = require('../models/subscription');

const validateUser = [
    body('username').not().isEmpty()
        .withMessage('Please enter a username')
        .custom(async (username) => {
            if (await User.fetch(username)) {
                throw new Error('Username is already taken');
            }
        }),
    body('email').not().isEmpty()
        .withMessage('Please enter your email')
        .custom(async (email) => {
            if (await User.fetchByEmail(email)) {
                throw new Error('Email is already in use');
            }
        }),
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
    create: [
        validateUser,
        async (req, res, next) => {
            const { username, email, password } = req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.json({
                    user: { username, email },
                    errors: errors.array(),
                });
            }
            try {
                const user = new User({ username, email, password });
                await user.save();
                req.session.userId = user.id;
                const { id } = user;
                const newUser = { id, email, username };
                res.json(newUser);
            } catch (err) {
                next(err);
            }
        },
    ],
    async show(req, res, next) {
        try {
            const { username } = req.params;
            const user = await User.fetch(username);
            if (user) {
                const comments = await Comment.fetch(user.id);
                const seen = await User.fetchSeen(user.id);
                res.json({
                    user,
                    comments,
                    seen,
                });
            } else {
                res.json({});
            }
        } catch (err) {
            next(err);
        }
    },
    async current(req, res, next) {
        try {
            if (req.currentUser) {
                const { id, email, username } = req.currentUser;
                const foundUser = { id, email, username };
                res.json(foundUser);
            } else {
                res.json({});
            }
        } catch (err) {
            next(err);
        }
    },
    async update(req, res) {
        const { id } = req.currentUser;
        const { name, about, location } = req.body;
        User.updateInfo(id, name, about, location);
    },
    async fetchInfo(req, res) {
        const { id } = req.currentUser;
        const user = await User.findById(id);
        const subs = await Subscription.get(user.id, 'venue');
        const userInfo = { about: user.about, location: user.location, name: user.name, subs };
        res.json(userInfo);
    },
};
