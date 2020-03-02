const Book = require('../models/book');
const User = require('../models/user')


module.exports = {
    index
};

function index(req, res) {
    Book.find({}).populate('author').exec(function(err, books) {
        console.log(err)
        console.log(books)
        res.render('books/index', { 
            user: req.user,
            books,
            title: 'All Books',
            User
        })
    });
}
