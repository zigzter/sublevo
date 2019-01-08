const express = require('express');
const usersController = require('../controllers/users');
const sessionController = require('../controllers/session');
const commentsController = require('../controllers/comments');
const artistsController = require('../controllers/artists');
const apiController = require('../controllers/api');
const venuesController = require('../controllers/venues');
const friendsController = require('../controllers/friends');
const eventsController = require('../controllers/events');

const router = express.Router();

router.post('/users', usersController.create);
router.get('/notifications', usersController.fetchNotifications);
router.post('/notifications/mark', usersController.markNotifications);
router.get('/users/:username', usersController.show);
router.get('/currentuser', usersController.current);
router.get('/currentuser/info', usersController.fetchInfo);
router.patch('/settings', usersController.update);

router.post('/artists/add', artistsController.addArtist);
router.get('/artists/fetch', artistsController.fetchSeen);
router.post('/artists/update', artistsController.updateSeen);
router.delete('/artists', artistsController.destroySeen);

router.post('/events/:eventId', eventsController.attending);
router.get('/events/:eventId', eventsController.fetchAttendees);

router.post('/session', sessionController.create);
router.delete('/session', sessionController.destroy);

router.post('/comments', commentsController.create);
router.get('/comments/:id', commentsController.fetch);
router.delete('/comments/:id', commentsController.destroy);

router.use('/api', apiController.getToken);
router.post('/api/artists', apiController.searchArtistSpotify);
router.get('/api/artists/:artistId', apiController.getArtistSpotify);
router.post('/api/venue', apiController.searchVenue);
router.get('/api/spotifyId/:artist', apiController.getSpotifyId);

router.post('/venues', venuesController.subscribeVenue);
router.delete('/venues', venuesController.remove);
router.get('/venues', venuesController.venueEvents);

router.post('/users/:username/addfriend', friendsController.sendRequest);
router.get('/friends', friendsController.getRequests);
router.post('/friends', friendsController.respond);

module.exports = router;
