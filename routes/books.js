const router = require('express').Router();
 
const booksCtrl = require('../controllers/books');


router.get('/', booksCtrl.index);
router.get('/:id', booksCtrl.show);
router.put('/:id', isLoggedIn, booksCtrl.update);
router.delete('/:id', isLoggedIn, booksCtrl.delete);
router.post('/:id/reviews', isLoggedIn, booksCtrl.create);


module.exports = router;

function isLoggedIn(req, res, next) {
    if ( req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
  }