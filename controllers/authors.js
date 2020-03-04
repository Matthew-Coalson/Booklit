const Author = require('../models/author');

module.exports = {
    index,
    show,
    create,
    update,
    delete: deleteRev
};

function deleteRev(req, res) {
    Author.findByIdAndUpdate(req.params.id,  
        { $pull: { reviews: { _id: req.body.revId }}},
        function(err, author) {
            res.redirect(`/authors/${author._id}`);
        }
    );
}

function update(req, res) {
    Author.findById(req.params.id, function(err, author) {
        const review = author.reviews.id(req.body.revId);
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
        res.render('authors/show', { author });
    });
}

function index(req, res) {
    author.find({}).populate('authors').exec(function(err, authors) {
        res.render('authors/index', { authors });
    });
}