var express = require('express');
var router = express.Router();
var HomeController=require('../Controller/HomeController');
var CheckLogin=require('../Controller/CheckLogin');
router.get('/',CheckLogin.CheckLogin,HomeController.getHome);

module.exports = router;
