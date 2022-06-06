const homeController = require('../controller/homeController');
const express = require('express');
const router = express.Router();

router.get('/getAdvisorList', homeController.getAdvisorList);
router.get('/getUserById/:id', homeController.getUserById);
router.post('/addMessage', homeController.addMessage);
router.get('/getMessageById', homeController.getMessageById);
router.get('/getMessageByReceiverID/:id', homeController.getMessageListByID);
router.get('/getMessage/:id', homeController.getMessageByReceiverID);
router.get('/getUser', homeController.getUser);
router.get('/getAccountType/:id', homeController.getAccountType);
router.put('/updateStatus', homeController.updateStatus);
router.get('/getIllness', homeController.getIllness);
router.get('/getImageByIllness/:idBenh', homeController.getImageByIllness);
router.get('/getCategory', homeController.getCategory);

module.exports = router;