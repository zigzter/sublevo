const validator = require('validator');
const User = require('../models/user');
const asyncCatch = require('../errorHandler');

const session = {
    async create(req, res) {
        const { handle, password } = req.body;
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
    },
    async destroy(req, res) {
        req.session.userId = undefined;
        res.json({});
    },
};

asyncCatch(session);

module.exports = session;
