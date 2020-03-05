const router = require('express').Router();
 
const authorsCtrl = require('../controllers/authors');


router.get('/', authorsCtrl.index);
router.get('/favorites', isLoggedIn, authorsCtrl.indexF);
router.get('/:id', authorsCtrl.show);
router.put('/:id', isLoggedIn, authorsCtrl.update);
router.delete('/:id', isLoggedIn, authorsCtrl.delete);
router.delete('/favorites/:id', isLoggedIn, authorsCtrl.deleteF);
router.post('/favorites/:id', isLoggedIn, authorsCtrl.createF);
router.post('/:id/reviews', isLoggedIn, authorsCtrl.create);


module.exports = router;

function isLoggedIn(req, res, next) {
    if ( req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
  }