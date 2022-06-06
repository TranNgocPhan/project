const IllnessController = require('../controller/illnessController');
const express = require('express');
const router = express.Router();

router.get('/getIllnessByID/:idBenh', IllnessController.getIllnessByID);
router.get('/getIllnessImage', IllnessController.getIllnessImage);
router.get('/getIllnessImageByID/:id', IllnessController.getIllnessImageByID);
router.get('/getCategoryNameByID/:id', IllnessController.getCategoryNameByID);
router.get('/getUserByID/:id', IllnessController.getUserById);
router.get('/getAccountType/:id', IllnessController.getAccountType);

module.exports = router;