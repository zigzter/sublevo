const express = require('express');
const homeController = require('../controllers/home');
const usersController = require('../controllers/users');
const sessionController = require('../controllers/session');
const commentsController = require('../controllers/comments');
const artistsController = require('../controllers/artists');
const apiController = require('../controllers/api');

const router = express.Router();

function auth(req, res, next) {
    if (!req.currentUser) {
        req.flash('danger', 'You must be logged in to do that');
        res.redirect('/');
    } else {
        next();
    }
}

router.get('/', homeController.index);

router.get('/users/new', usersController.new);
router.post('/users', usersController.create);
router.get('/users/:username', usersController.show);
router.get('/settings', auth, usersController.edit);

router.get('/artists/:username', auth, artistsController.getSeen);
router.post('/artists/add', auth, artistsController.addArtist);
router.post('/artists/update', auth, artistsController.updateSeen);
router.delete('/artists/delete/:id', auth, artistsController.destroySeen);

router.get('/session/new', sessionController.new);
router.post('/session', sessionController.create);
router.delete('/session', sessionController.destroy);

router.get('/users/:username/comments/', commentsController.index);
router.post('/users/:username/comments/', commentsController.create);
router.delete('/users/:username/comments/:id', auth, commentsController.destroy);

router.use('/api', apiController.getToken);
router.post('/api', apiController.searchArtistSpotify);
router.post('/api/venue', apiController.searchVenue);

module.exports = router;
