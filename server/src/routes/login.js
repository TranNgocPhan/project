const LoginController = require('../controller/loginController');
const express = require('express');
const app = express();
const router = express.Router();

router.get('/getAccount', LoginController.getAccount);
router.get('/getUser/:slug', LoginController.getUser);

module.exports = router;