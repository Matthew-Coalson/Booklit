const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 10
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

const authorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: true
    },
    favoritedBy: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    reviews: [reviewSchema]
}, {
    timestamps: true
});

module.exports = mongoose.model('Author', authorSchema);