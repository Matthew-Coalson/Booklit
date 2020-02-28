const router = require('express').Router();
 
const passport = require('passport');

const booksCtrl = require('../controllers/books');


router.get('/', booksCtrl.index)

module.exports = router;
