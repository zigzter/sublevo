const express = require('express');
const homeController = require('../controllers/home');
const usersController = require('../controllers/users');
const sessionController = require('../controllers/session');
const commentsController = require('../controllers/comments');

const router = express.Router();

router.get('/', homeController.index);

router.get('/users/new', usersController.new);
router.post('/users', usersController.create);
router.get('/users/:username', usersController.show);
router.get('/settings', usersController.edit);
router.post('/users/:username/add', usersController.addArtist);
router.post('/users/:username/seen', usersController.updateSeen);

router.get('/session/new', sessionController.new);
router.post('/session', sessionController.create);
router.delete('/session', sessionController.destroy);

router.post('/users/:username/comments/', commentsController.create);

module.exports = router;
