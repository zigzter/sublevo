const express = require('express');
const homeController = require('../controllers/home');
const usersController = require('../controllers/users');
const sessionController = require('../controllers/session');
const commentsController = require('../controllers/comments');
const artistsController = require('../controllers/artists');

const router = express.Router();

function auth(req,res,next) {
    if (!req.currentUser) {
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

router.post('/artists/add', artistsController.addArtist);
router.post('/artists/update', artistsController.updateSeen);
router.delete('/artists/delete/:id', artistsController.destroySeen);

router.get('/session/new', sessionController.new);
router.post('/session', sessionController.create);
router.delete('/session', sessionController.destroy);

router.post('/users/:username/comments/', commentsController.create);
router.delete('/users/:username/comments/:id', commentsController.destroy);

module.exports = router;
