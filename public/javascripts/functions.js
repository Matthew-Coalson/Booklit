module.exports = {
    getAvgRating
}

function getAvgRating(element) {
    let ratingAvg = 0;
    element.reviews.forEach(rev => {
        ratingAvg += rev.rating;
    });
    ratingAvg = ratingAvg / element.reviews.length;
    return isNaN(ratingAvg) ? '~' : ratingAvg;
}