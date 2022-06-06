const adminController = require('../controller/adminController');
const express = require('express');
const router = express.Router();

router.post('/addUser', adminController.addUser);
router.get('/getUserList', adminController.getUserList);
router.put('/updateUserByID/:id', adminController.getUserList);
router.get('/getAccountType', adminController.getAccountType);
router.put('/updateAccountType/:id', adminController.updateAccountType);
router.post('/addIllness', adminController.addIllness);
router.get('/getIllness', adminController.getIllness);
router.put('/updateIllness/:id', adminController.updateIllness);
router.delete('/deleteIllness/:id', adminController.deleteIllness);

module.exports = router;