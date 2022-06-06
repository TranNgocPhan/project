const express = require('express');
const router = express.Router();
const ProfileController = require('../controller/profileController');

router.put('/updateInfo', ProfileController.updateInfo);
router.put('/updatePassword', ProfileController.updatePassword);
router.get('/getAccountByID/:id', ProfileController.getAccountByID);

module.exports = router;