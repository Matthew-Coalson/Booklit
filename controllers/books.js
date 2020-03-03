const Book = require('../models/book');

module.exports = {
    index,
    show,
    create,
    update,
    delete: deleteRev
};

function deleteRev(req, res) {
    Book.findByIdAndUpdate(req.params.id,  
        { $pull: { reviews: { _id: req.body.revId }}},
        function(err, book) {
            res.redirect(`/books/${book._id}`);
        }
    );
}

function update(req, res) {
    Book.findById(req.params.id, function(err, book) {
        const review = book.reviews.id(req.body.revId);
        review.review = req.body.review;
        review.rating = req.body.rating;
        console.log(review);
        book.save(function(err, book) {
            res.redirect(`/books/${book._id}`);
        })

    });
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