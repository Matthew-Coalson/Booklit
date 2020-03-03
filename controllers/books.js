const Book = require('../models/book');
const User = require('../models/user')


module.exports = {
    index,
    show,
    create
};

function create(req, res) {
    Book.findById(req.params.id, function(err, book) {
        req.body.createdBy = req.user._id;
        book.reviews.push(req.body);
        book.save(function(err) {
            res.redirect(`/books/${book._id}`);
        });
    });
}

function show(req, res) {
    Book.findById(req.params.id, function(err, book) {
        res.render('books/show', { book, user: req.user });
    })
}

function index(req, res) {
    Book.find({}).populate('authors').exec(function(err, books) {
        res.render('books/index', { 
            user: req.user,
            books,
        })
    });
}
// function index(req, res) {
//     Book.find({}).populate({path: 'author', select: 'name'}).exec(function(err, books) {
//         console.log(err)
//         //books.forEach(book => console.log(book.author));
//         res.render('books/index', { 
//             user: req.user,
//             books,
//             User
//         })
//     });
// }


