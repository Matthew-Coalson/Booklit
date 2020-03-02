const router = require('express').Router();
 
const booksCtrl = require('../controllers/books');


router.get('/', booksCtrl.index)

module.exports = router;
