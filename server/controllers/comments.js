const { body, validationResult } = require('express-validator/check');
const Comment = require('../models/comment');

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
                return res.json(errors.mapped());
            }
            try {
                const { content, targetId, targetType } = req.body;
                const authorId = req.currentUser.id;
                const comment = new Comment({ authorId, targetId, targetType, content });
                await comment.save();
                const { id, createdAt } = comment;
                res.json({ id, createdAt });
            } catch (err) {
                next(err);
            }
        },
    ],
    async fetch(req, res, next) {
        try {
            const { id } = req.params;
            const comments = await Comment.fetch(id);
            res.json(comments);
        } catch (err) {
            next(err);
        }
    },
    async destroy(req, res, next) {
        try {
            const { id } = req.params;
            const comment = await Comment.fetchById(id);
            comment.destroy();
            res.status(204).send();
        } catch (err) {
            next(err);
        }
    },
};
