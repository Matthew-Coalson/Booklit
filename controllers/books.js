const Book = require('../models/book');
const User = require('../models/user')


module.exports = {
    index
};

function index(req, res) {
    console.log(req.query)
    res.render('books/index', {
        user: req.user
    });
}
