const { body, validationResult } = require('express-validator/check');
const Comment = require('../models/comment');
const User = require('../models/user');

const validateComment = [
    body('content').not().isEmpty()
        .withMessage('Please enter a comment'),
];

module.exports = {
    create: [
        validateComment,
        async (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.redirect(`/users/${ req.params.username }`);
            }
            try {
                const { content } = req.body;
                const { username } = req.params;
                const profile = await User.fetch(username);
                const profileId = profile.id;
                const authorId = req.currentUser.id;
                const comment = new Comment({ authorId, profileId, content });
                await comment.save();
                res.redirect(`/users/${ profile.username }`);
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
                res.redirect(`/users/${ req.params.username }`);
            } else {
                req.flash('danger', 'Access denied');
                res.redirect(`/users/${ req.params.username }`);
            }
        } catch (err) {
            next(err);
        }
    },
};
