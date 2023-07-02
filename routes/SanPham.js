

var express = require('express');
var router = express.Router();
var SPController = require('../Controller/SanPhamController');
var CheckLogin=require('../Controller/CheckLogin');
router.get('/ListSp',CheckLogin.CheckLogin, SPController.getListSP);
router.delete('/ListSp/:id', SPController.deleteSP);
router.get('/AddSP',CheckLogin.CheckLogin, SPController.AddSP);
router.post('/AddSP',SPController.postSP);

router.get('/Update/:idSP',CheckLogin.CheckLogin,SPController.updateSP);
router.post('/Update/:idSP',SPController.updateSP);
router.post('/ListSP',SPController.deleteSP);

router.get('/ListCategory',CheckLogin.CheckLogin,SPController.getCategory);
router.post('/ListCategory',SPController.getCategory);
router.delete('/ListCategory/:id',SPController.deleteCate);

router.get('/ListCategory/:id',SPController.Category);
router.post('/ListCategory/:id',SPController.Category);
router.get('/DetailSP/:idDetail',CheckLogin.CheckLogin,SPController.DetailSP);
module.exports = router;