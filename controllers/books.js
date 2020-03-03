const Book = require('../models/book');
const User = require('../models/user')


module.exports = {
    index,
    show,
    create,
    update
};

function update(req, res) {
    Book.findById(req.params.id, function(err, book) {
        const review = book.reviews.id(req.body.revId);
        review.review = req.body.review;
        review.rating = req.body.rating;
        console.log(review);
        
        book.save(function(err) {
            res.redirect(`/books/${book._id}`);
        })

    })
}

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
    Book.findById(req.params.id).populate('reviews.createdBy').exec(function(err, book) {
        res.render('books/show', { book, user: req.user });
    });
}

function index(req, res) {
    Book.find({}).populate('authors').exec(function(err, books) {
        res.render('books/index', { 
            user: req.user,
            books,
        });
    });
}