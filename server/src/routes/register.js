const express = require('express');
const router = express.Router();
const RegisterController = require('../controller/registerController');

router.post('/addNewUser', RegisterController.addNewUser);
router.get('/verifyEmail', RegisterController.verifyEmail);

module.exports = router;