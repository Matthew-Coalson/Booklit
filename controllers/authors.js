const Author = require('../models/author');
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
    Author.findById(req.params.id, function(err, author) {
        if (author.favoritedBy.some(e => e.equals(user._id))) {
            res.redirect(backURL);
        }
        author.favoritedBy.push(req.user.id);
        author.save(function(err) {
            res.redirect(backURL);
        });
    });
}

function deleteF(req, res) {
    backURL = req.header('Referer') || '/';
    Author.findByIdAndUpdate(req.params.id,
        { $pull: { favoritedBy: req.user._id}},
        function(err) {
            res.redirect(backURL);
        });
}

function indexF(req, res) {
    Author.find({}).populate('authors').exec(function(err, authors) {
        res.render('authors/favorites', { authors });
    });
}

function deleteRev(req, res) {
    Author.findById(req.params.id, function(err, author) {
        const review = author.reviews.id(req.body.revId);
        if (!review.createdBy.equals(req.user._id)) return res.redirect(`/authors/${author._id}`);
        review.remove();
        author.save(function(err, author) {
            res.redirect(`/authors/${author._id}`);
        });
    });
}

function update(req, res) {
    Author.findById(req.params.id, function(err, author) {
        const review = author.reviews.id(req.body.revId);
        if (!review.createdBy.equals(req.user._id)) return res.redirect(`/authors/${author._id}`);
        review.review = req.body.review;
        review.rating = req.body.rating;
        console.log(review);
        author.save(function(err, author) {
            res.redirect(`/authors/${author._id}`);
        })

    });
}

function create(req, res) {
    Author.findById(req.params.id, function(err, author) {
        req.body.createdBy = req.user._id;
        author.reviews.push(req.body);
        author.save(function(err) {
            res.redirect(`/authors/${author._id}`);
        });
    });
}

function show(req, res) {
    Author.findById(req.params.id).populate('reviews.createdBy').exec(function(err, author) {
        const rating = func.getAvgRating(author);
        res.render('authors/show', { author, rating });
    });
}

function index(req, res) {
    Author.find({}).populate('authors').exec(function(err, authors) {
        const ratingsArr = [];
        authors.forEach((a) => {
            ratingsArr.push(func.getAvgRating(a));
        }) 
        res.render('authors/index', { authors, ratingsArr });
    });
}