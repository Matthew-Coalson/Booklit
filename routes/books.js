const router = require('express').Router();
 
const booksCtrl = require('../controllers/books');


router.get('/', booksCtrl.index);
router.get('/favorites', isLoggedIn, booksCtrl.indexF);
router.get('/:id', isLoggedIn, booksCtrl.show);
router.put('/:id', isLoggedIn, booksCtrl.update);
router.delete('/:id', isLoggedIn, booksCtrl.delete);
router.delete('/favorites/:id', isLoggedIn, booksCtrl.deleteF);
router.post('/favorites/:id', isLoggedIn, booksCtrl.createF);
router.post('/:id/reviews', isLoggedIn, booksCtrl.create);


module.exports = router;

function isLoggedIn(req, res, next) {
    if ( req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
  }