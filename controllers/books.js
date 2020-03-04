const Book = require('../models/book');

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
    console.log("params id --------", req.params.id);
    Book.findById(req.params.id, function(err, book) {
        if (book.favoritedBy.some(e => e.equals(user._id))) {
            res.redirect(backURL);
        }
        book.favoritedBy.push(req.user.id);
        book.save(function(err) {
            res.redirect(backURL);
        });
    });
}

function deleteF(req, res) {
    Book.findByIdAndUpdate(req.params.id,
        { $pull: { createdBy: {_id: req.user._id}}},
        function(err, book) {
            res.redirect('/books/favorites');
        });
}

function indexF(req, res) {
    Book.find({}).populate('authors').populate('favoritedBy').exec(function(err, books) {
        res.render('books/indexB', { books });
    });
}

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
        res.render('books/show', { book });
    });
}

function index(req, res) {
    Book.find({}).populate('authors').exec(function(err, books) {
        res.render('books/index', { books });
    });
}