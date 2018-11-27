const User = require('../models/user');
const Artist = require('../models/artist');

module.exports = {
    async addArtist(req, res, next) {
        try {
            const { addedArtistName, addedArtistId, artistImage } = req.body;
            const { username } = req.currentUser;
            const dbUser = await User.fetch(username);
            let dbArtist = await Artist.fetch(addedArtistId);
            if (!dbArtist) {
                [dbArtist] = await Artist.saveDb(addedArtistName, addedArtistId, artistImage);
            }
            await User.addSeen(dbUser.id, dbArtist.id);
            res.json({});
        } catch (err) {
            res.json({ error: 'Artist already added' })
        }
    },
    async fetchSeen(req, res, next) {
        const { id } = req.currentUser;
        const seen = await User.fetchSeen(id);
        res.json({ seen });
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
    async destroySeen(req, res) {
        const userId = req.currentUser.id;
        const artistId = req.params.id;
        User.removeSeen(userId, artistId);
        res.redirect('/settings');
    },
};
