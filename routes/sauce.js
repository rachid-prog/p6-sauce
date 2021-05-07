const express = require('express');
const router = express.Router();

const sauceCtrl = require('../controllers/sauce');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');


router.get('/', sauceCtrl.getAllSauce);
router.post('/',multer ,sauceCtrl.createSauce);
router.get('/:id', sauceCtrl.getOneSauce);
router.put('/:id',multer, sauceCtrl.modifySauce);
router.delete('/:id', sauceCtrl.deleteSauce);
router.post('/:id/like', sauceCtrl.likeSauce);


module.exports = router;