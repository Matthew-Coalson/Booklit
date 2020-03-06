const Book = require('../models/book');
const func = require('../public/javascripts/functions');

module.exports = {
    index,
    show,
    create,
    update,
    delete: deleteRev,
    indexF,
    deleteF,
    createF
};

function createF(req, res) {
    backURL = req.header('Referer') || '/';
    Book.findById(req.params.id, function(err, book) {
        if (book.favoritedBy.some(e => e.equals(req.user._id))) {
            res.redirect(backURL);
        }
        book.favoritedBy.push(req.user.id);
        book.save(function(err) {
            res.redirect(backURL);
        });
    });
}

function deleteF(req, res) {
    backURL = req.header('Referer') || '/';
    Book.findByIdAndUpdate(req.params.id,
        { $pull: { favoritedBy: req.user._id}},
        function(err) {
            res.redirect(backURL);
        });
}

function indexF(req, res) {
    Book.find({}).populate('authors').exec(function(err, books) {
        res.render('books/favorites', { books });
    });
}

function deleteRev(req, res) {
    Book.findById(req.params.id, function(err, book) {
        const review = book.reviews.id(req.body.revId);
        if (!review.createdBy.equals(req.user._id)) return res.redirect(`/books/${book._id}`);
        review.remove();
        book.save(function(err, book) {
            res.redirect(`/books/${book._id}`);
        });
    });
}

function update(req, res) {
    Book.findById(req.params.id, function(err, book) {
        const review = book.reviews.id(req.body.revId);
        if (!review.createdBy.equals(req.user._id)) return res.redirect(`/books/${book._id}`);
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
    Book.findById(req.params.id).populate('authors').populate('reviews.createdBy').exec(function(err, book) {
        const rating = func.getAvgRating(book);
        res.render('books/show', { book, rating });
    });
}

function index(req, res) {
    Book.find({}).populate('authors').exec(function(err, books) {
        let ratingsArr = [];
        books.forEach((b) => {
            ratingsArr.push(func.getAvgRating(b));
        }) 
        res.render('books/index', { books, ratingsArr });
    });
}