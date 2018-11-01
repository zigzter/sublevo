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
                return res.render('/users/show');
            }
            try {
                const { content } = req.body;
                const profile = req.params.username;
                const author = req.currentUser.username;
                const comment = new Comment({ author, profile, content });
                await comment.save();
                res.redirect(`/users/${ profile }`);
            } catch (err) {
                next(err);
            }
        },
    ],
};
