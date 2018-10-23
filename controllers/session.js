module.exports = {
    new(req, res) {
        res.render('session/new');
    },
    async create(req, res) {
        // log user in
    },
    destroy(req, res) {
        // log user out
    },
};
