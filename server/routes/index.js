const express = require('express');
const usersController = require('../controllers/users');
const sessionController = require('../controllers/session');
const commentsController = require('../controllers/comments');
const artistsController = require('../controllers/artists');
const apiController = require('../controllers/api');
const venuesController = require('../controllers/venues');

const router = express.Router();

function auth(req, res, next) {
    if (!req.currentUser) {
        req.flash('danger', 'You must be logged in to do that');
        res.redirect('/');
    } else {
        next();
    }
}

router.post('/users', usersController.create);
router.get('/users/:username', usersController.show);
router.get('/currentuser', usersController.current);
router.get('/settings', auth, usersController.edit);

router.post('/artists/add', artistsController.addArtist);
router.get('/artists/fetch', artistsController.fetchSeen);
router.post('/artists/update', artistsController.updateSeen);
router.delete('/artists/delete/:id', auth, artistsController.destroySeen);

router.get('/session/new', sessionController.new);
router.post('/session', sessionController.create);
router.delete('/session', sessionController.destroy);

router.post('/users/:username/comments/', commentsController.create);
router.delete('/users/:username/comments/:id', commentsController.destroy);

router.use('/api', apiController.getToken);
router.post('/api/artists', apiController.searchArtistSpotify);
router.post('/api/venue', apiController.searchVenue);

router.post('/venues', venuesController.subscribeVenue);
router.get('/venues', venuesController.venueEvents);

module.exports = router;
