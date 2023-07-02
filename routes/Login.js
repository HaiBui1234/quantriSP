const express=require('express');
const router=express.Router();
const LoginController=require('../Controller/LoginController');
router.get('/',LoginController.getFormLogin);
router.post('/',LoginController.postAccout);
module.exports=router;