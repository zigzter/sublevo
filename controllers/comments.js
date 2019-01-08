const { body, validationResult } = require('express-validator/check');
const Comment = require('../models/comment');
const asyncCatch = require('../errorHandler');

const validateComment = [
    body('content').not().isEmpty()
        .withMessage('Please enter a comment'),
];

const comments = {
    create: [
        validateComment,
        async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.json(errors.mapped());
            }
            const { content, targetId, targetType } = req.body;
            const authorId = req.currentUser.id;
            const comment = new Comment({ authorId, targetId, targetType, content });
            await comment.save();
            const { id, createdAt } = comment;
            res.json({ id, createdAt });
        },
    ],
    async fetch(req, res) {
        const { id } = req.params;
        const comments = await Comment.fetch(id);
        res.json(comments);
    },
    async destroy(req, res) {
        const { id } = req.params;
        const comment = await Comment.fetchById(id);
        comment.destroy();
        res.status(204).send();
    },
};

asyncCatch(comments);

module.exports = comments;
