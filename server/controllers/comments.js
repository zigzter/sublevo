const { body, validationResult } = require('express-validator/check');
const Comment = require('../models/comment');
const User = require('../models/user');

const validateComment = [
    body('content').not().isEmpty()
        .withMessage('Please enter a comment'),
];

module.exports = {
    async index(req, res) {
        const { username } = req.params;
        const user = await User.fetch(username);
        const comments = await Comment.fetch(user.id);
        if (comments) {
            res.json(comments);
        }
    },
    create: [
        // validateComment,
        async (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.json(errors.mapped());
            }
            try {
                const { content, profileId } = req.body;
                const authorId = req.currentUser.id;
                const comment = new Comment({ authorId, profileId, content });
                await comment.save();
                res.send('ok');
            } catch (err) {
                next(err);
            }
        },
    ],
    async destroy(req, res, next) {
        try {
            const { id } = req.params;
            const currentId = req.currentUser.id;
            const comment = await Comment.fetchById(id);
            if (currentId === comment.profileId || currentId === comment.authorId) {
                comment.destroy();
                res.redirect(`/users/${req.params.username}`);
            } else {
                req.flash('danger', 'Access denied');
                res.redirect(`/users/${req.params.username}`);
            }
        } catch (err) {
            next(err);
        }
    },
};
