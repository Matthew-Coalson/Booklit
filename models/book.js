const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookReviewSchema = new Schema({
    rating: {
        type: Number,
        min: 1,
        max: 10,
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    review: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    coverArt: {
        type: String,
        required: true
    },
    author: [{
        type: Schema.Types.ObjectId,
        required: true
    }],
    genre: [{
        type: String,
        enum: ['Action', 'Art', 'Alternate History', 'Autobiography', 'Anthology',	'Biography',
            'Chick lit', 'Book Review', "Children's", 'Cookbook', 'Comic Book',	'Diary', 'Coming-of-age', 
            'Dictionary', 'Crime', 'Encyclopedia', 'Drama', 'Guide', 'Fairytale', 'Health', 'Fantasy',
            'History', 'Graphic Novel',	'Journal', 'Historical Fiction', 'Math', 'Horror', 'Memoir',
            'Mystery', 'Prayer', 'Paranormal Romance', 'Religion', 'Picture Book', 'Textbook', 'Poetry',
            'Review', 'Political Thriller', 'Science', 'Romance', 'Self Help', 'Satire', 'Travel', 'Non-Fiction',
            'Science Fiction', 'True Crime', 'Short Story', 'Suspense', 'Thriller', 'Young Adult', 'Fiction']
    }],
    synopsis: {
        type: String,
        required: true
    },
    releaseYr: {
        type: Date,
        required: true
    },
    favoritedBy: [Schema.Types.ObjectId],
    reviews: [bookReviewSchema]

}, {
    timestamps: true
});

module.exports = mongoose.model('Book', bookSchema);

