const User = require('../models/user');
const Friend = require('../models/friend');
const asyncCatch = require('../errorHandler');

const friends = {
    async sendRequest(req, res) {
        const friendee = User.fetch(req.params.username);
        const friender = User.fetch(req.currentUser.username);
        const [{ id: userOne }, { id: userTwo }] = await Promise.all([friender, friendee]);
        Friend.sendRequest(userOne, userTwo);
        res.status(204).send();
    },
    async getRequests(req, res) {
        const { id } = req.currentUser;
        const friendRequests = await Friend.getRequests(id);
        res.json(friendRequests);
    },
    async respond(req, res) {
        const { response, userOne } = req.body;
        const actionUser = req.currentUser.id;
        Friend.update(userOne, actionUser, actionUser, response);
        res.status(204).send();
    },
};

asyncCatch(friends);

module.exports = friends;
