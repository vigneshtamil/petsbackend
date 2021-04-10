var express = require('express');
var router = express.Router();




const user = require('../controller').user
router.post('/signup', user.signup)
router.post('/login', user.login)
router.post('/forgotpasswordotpsend', user.forgotpasswordotpsend)
router.post('/forgotpasswordotpverified', user.forgotpasswordotpverified)
router.post('/forgotpasswordchange', user.forgotpasswordchange)

module.exports = router;
