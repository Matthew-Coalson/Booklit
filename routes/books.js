const router = require('express').Router();
 
const booksCtrl = require('../controllers/books');


router.get('/', booksCtrl.index);
router.get('/:id', booksCtrl.show);
router.post('/:id/create', isLoggedIn, booksCtrl.create);


module.exports = router;

function isLoggedIn(req, res, next) {
    if ( req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
  }