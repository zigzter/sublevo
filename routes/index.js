const express = require('express');
const homeController = require('../controllers/home');
const usersController = require('../controllers/users');
const sessionController = require('../controllers/session');

const router = express.Router();

router.get('/', homeController.index);

router.get('/users/new', usersController.new);
router.post('/users', usersController.create);

router.get('/session/new', sessionController.new);
router.post('/session', sessionController.create);
router.delete('/session', sessionController.destroy);

module.exports = router;
