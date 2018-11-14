const User = require('../models/user');
const Artist = require('../models/artist');

module.exports = {
    async getSeen(req, res) {
        const user = await User.fetch(req.params.username);
        const artists = await User.fetchSeen(user.id);
        res.json(artists);
    },
    async addArtist(req, res, next) {
        try {
            const { addedArtistName, addedArtistId } = req.body;
            const { username } = req.currentUser;
            const dbUser = await User.fetch(username);
            let dbArtist = await Artist.fetch(addedArtistId);
            if (!dbArtist) {
                [dbArtist] = await Artist.saveDb(addedArtistName, addedArtistId);
            }
            await User.addSeen(dbUser.id, dbArtist.id);
        } catch (err) {
            next(err);
        }
    },
    async updateSeen(req, res, next) {
        try {
            const { id, seenCount } = req.body;
            const { username } = req.currentUser;
            const dbUser = await User.fetch(username);
            await User.updateSeenCount(id, dbUser.id, seenCount);
        } catch (err) {
            next(err);
        }
    },
    async destroySeen(req, res, next) {
        const userId = req.currentUser.id;
        const artistId = req.params.id;
        User.removeSeen(userId, artistId);
        res.redirect('/settings');
    },
};
