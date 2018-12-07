const axios = require('axios');
const User = require('../models/user');
const Artist = require('../models/artist');
const asyncCatch = require('../errorHandler');

const { LASTFM_KEY } = process.env;

const artists = {
    async addArtist(req, res) {
        try {
            let { addedArtistName, addedArtistId, artistImage } = req.body;
            const { username } = req.currentUser;
            const { data: { results: { artistmatches: { artist } } } } = await axios.get(`https://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${ addedArtistName }&api_key=${ LASTFM_KEY }&format=json&limit=1`);
            const { image } = artist[0];
            if (image[image.length - 1]['#text']) {
                artistImage = image[image.length - 1]['#text'];
            }
            const dbUser = await User.fetch(username);
            let dbArtist = await Artist.fetch(addedArtistId);
            if (!dbArtist) {
                [dbArtist] = await Artist.saveDb(addedArtistName, addedArtistId, artistImage);
            }
            await User.addSeen(dbUser.id, dbArtist.id);
            res.status(200).json({});
        } catch (err) {
            res.json({ error: 'Artist already added' });
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
            res.status(204).send();
        } catch (err) {
            next(err);
        }
    },
    destroySeen(req, res) {
        const userId = req.currentUser.id;
        const { artistId } = req.body;
        User.removeSeen(userId, artistId);
        res.status(204).send();
    },
};

asyncCatch(artists);

module.exports = artists;
