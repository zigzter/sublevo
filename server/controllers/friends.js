const User = require('../models/user');
const Friend = require('../models/friend');

module.exports = {
    async sendRequest(req, res) {
        try {
            const friendee = User.fetch(req.params.username);
            const friender = User.fetch(req.currentUser.username);
            const [{ id: userOne }, { id: userTwo }] = await Promise.all([friender, friendee]);
            Friend.sendRequest(userOne, userTwo);
        } catch (err) {
            res.json(err);
        }
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
    },
};
