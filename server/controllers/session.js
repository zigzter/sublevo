const validator = require('validator');
const User = require('../models/user');

module.exports = {
    new(req, res) {
        res.render('session/new');
    },
    async create(req, res, next) {
        const { handle, password } = req.body;
        try {
            let user;
            if (validator.isEmail(handle)) {
                user = await User.find('email', handle);
            } else {
                user = await User.find('username', handle);
            }
            if (user && await user.authenticate(password)) {
                req.session.userId = user.id;
                const { id, email, username } = user;
                const foundUser = { id, email, username };
                res.json(foundUser);
            } else {
                res.json({ error: 'Invalid credentials' });
            }
        } catch (err) {
            next(err);
        }
    },
    destroy(req, res) {
        req.session.userId = undefined;
        res.json({});
    },
};
