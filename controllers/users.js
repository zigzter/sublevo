const { body, validationResult } = require('express-validator/check');
const blacklist = require("the-big-username-blacklist");
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');
const asyncCatch = require('../errorHandler');

const User = require('../models/user');
const Friend = require('../models/friend');
const Comment = require('../models/comment');
const Subscription = require('../models/subscription');

const storage = multer.diskStorage({
    destination: './public/img/',
    filename: (req, file, cb) => {
        crypto.pseudoRandomBytes(16, (err, raw) => {
            if (err) return cb(err)
            cb(null, raw.toString('hex') + path.extname(file.originalname))
        });
    },
});

const upload = multer({ dest: 'public/img/', storage });

const validateUser = [
    body('username').trim().escape()
        .not().isEmpty().withMessage('Please enter a username')
        .custom(async (username) => {
            if (await User.fetch(username)) {
                throw new Error('Username is already taken');
            }
            if (!blacklist.validate(username)) {
                throw new Error('Username blacklisted');
            }
            if (/[^a-zA-Z0-9\-\/]/.test(username)) {
                throw new Error('Username must be alphanumeric');
            }
        }),
    body('email').trim()
        .not().isEmpty()
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

const users = {
    create: [
        validateUser,
        async (req, res) => {
            const { username, email, password } = req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.json({
                    user: { username, email },
                    errors: errors.array(),
                });
            }
            const user = new User({ username, email, password });
            await user.save();
            req.session.userId = user.id;
            const { id } = user;
            const newUser = { id, email, username };
            res.json(newUser);
        },
    ],
    async show(req, res) {
        const { username } = req.params;
        const user = await User.fetch(username);
        if (user) {
            const commentsP = Comment.fetch(user.id);
            const seenP = User.fetchSeen(user.id);
            const friendsP = Friend.get(user.id);
            const [comments, seen, friends = []] = await Promise.all([commentsP, seenP, friendsP]);
            res.json({
                user,
                comments,
                seen,
                friends,
            });
        } else {
            res.json({});
        }
    },
    async current(req, res) {
        if (req.currentUser) {
            const { id, email, username, avatar } = req.currentUser;
            const foundUser = { id, email, username, avatar };
            res.json(foundUser);
        } else {
            res.json(null);
        }
    },
    update: [
        upload.single('avatar'),
        async (req, res) => {
            const { id } = req.currentUser;
            let avatar;
            if (req.file) {
                avatar = req.file.filename;
            }
            const { name, about, location } = req.body;
            User.updateInfo(id, name, about, location, avatar);
            res.status(204).send();
        },
    ],
    async fetchInfo(req, res) {
        const { id } = req.currentUser;
        const user = await User.findById(id);
        const subs = await Subscription.get(user.id, 'venue');
        const userInfo = { about: user.about, location: user.location, name: user.name, avatar: user.avatar, subs };
        res.json(userInfo);
    },
    async fetchNotifications(req, res) {
        const { id } = req.currentUser;
        const notes = await User.fetchNotifications(id);
        res.status(200).json(notes);
    },
    async markNotifications(req, res) {
        const { notificationIds } = req.body;
        await User.markNotifications(notificationIds);
        res.status(204).send();
    },
};

asyncCatch(users);

module.exports = users;
