const SpotifyWebApi = require('spotify-web-api-node');
const axios = require('axios');

const SpotifyClientId = process.env.SPOTIFY_CLIENT_ID;
const SpotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const SongkickKey = process.env.SONGKICK_KEY;

const spotify = new SpotifyWebApi({
    clientId: SpotifyClientId,
    clientSecret: SpotifyClientSecret,
});

module.exports = {
    getToken(req, res, next) {
        spotify.clientCredentialsGrant()
            .then((data) => {
                spotify.setAccessToken(data.body['access_token']);
                next();
            },
                (err) => {
                    next(err);
                });
    },
    searchArtistSpotify(req, res, next) {
        try {
            const { artist } = req.body;
            spotify.searchArtists(artist, { limit: 1 })
                .then((data) => {
                    const { items } = data.body.artists;
                    res.json(items);
                }, (err) => {
                    res.json(err);
                });
        } catch (err) {
            next(err);
        }
    },
    async searchVenue(req, res, next) {
        try {
            const { venueSearch } = req.body;
            const data = await axios.get(`https://api.songkick.com/api/3.0/search/venues.json?query=${venueSearch}&apikey=${SongkickKey}&per_page=3`);
            const { venue } = data.data.resultsPage.results; // 'venue' is an array of the results
            res.json(venue);
        } catch (err) {
            next(err);
        }
    },
};
