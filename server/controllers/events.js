const Comment = require('../models/comment');

module.exports = {
    async fetchComments(req, res, next) {
        try {
            const { id } = req.params;
            const comments = await Comment.fetch(id);
            res.json(comments);
        } catch (err) {
            next(err);
        }
    },
};
