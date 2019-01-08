const SpotifyWebApi = require('spotify-web-api-node');
const axios = require('axios');
const asyncCatch = require('../errorHandler');

const SpotifyClientId = process.env.SPOTIFY_CLIENT_ID;
const SpotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const SongkickKey = process.env.SONGKICK_KEY;
const { LASTFM_KEY } = process.env;

const spotify = new SpotifyWebApi({
    clientId: SpotifyClientId,
    clientSecret: SpotifyClientSecret,
});

const api = {
    async getToken(req, res, next) {
        const { body } = await spotify.clientCredentialsGrant();
        await spotify.setAccessToken(body.access_token);
        next();
    },
    async searchArtistSpotify(req, res) {
        const { artist } = req.body;
        const { body: { artists: { items } } } = await spotify.searchArtists(artist, { limit: 1 });
        res.json(items);
    },
    async getSpotifyId(req, res) {
        const { artist } = req.params;
        const { body } = await spotify.searchArtists(artist, { limit: 1 });
        const { id } = body.artists.items[0];
        res.json(id);
    },
    async getArtistSpotify(req, res) {
        const { artistId } = req.params;
        const { body: artist } = await spotify.getArtist(artistId);
        const rawSKartistPromise = axios.get(`https://api.songkick.com/api/3.0/search/artists.json?apikey=${ SongkickKey }&query=${ artist.name }&per_page=1`);
        const artistBioRawPromise = axios.get(`https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${ artist.name }&api_key=${ LASTFM_KEY }&format=json&limit=1`);
        const [rawSKartist, artistBioRaw] = await Promise.all([rawSKartistPromise, artistBioRawPromise]);
        artist.bio = artistBioRaw.data.artist.bio.content;
        const { id: songkickId } = rawSKartist.data.resultsPage.results.artist[0];
        const rawSKevents = await axios.get(`https://api.songkick.com/api/3.0/artists/${ songkickId }/calendar.json?apikey=${ SongkickKey }`);
        const events = rawSKevents.data.resultsPage.results.event || [];
        res.json({ artist, events });
    },
    async searchVenue(req, res) {
        const { venueSearch } = req.body;
        if (!venueSearch) return res.json({});
        const data = await axios.get(`https://api.songkick.com/api/3.0/search/venues.json?query=${ venueSearch }&apikey=${ SongkickKey }&per_page=3`);
        const { venue } = data.data.resultsPage.results;
        res.json(venue);
    },
};

asyncCatch(api);

module.exports = api;
