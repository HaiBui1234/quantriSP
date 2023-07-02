var express =require('express');
var router=express.Router();
var ProductsApi=require('../Controller/API/Products.api');
var UserApi=require('../Controller/API/Users.api') 
router.get('/products',ProductsApi.apiListSP);
router.get('/users',UserApi.ListUser);
router.get('/addUser',UserApi.postUser);
router.post('/addUser',UserApi.postUser);
module.exports=router;