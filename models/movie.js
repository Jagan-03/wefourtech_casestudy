const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    movieName : String,
    rating : Number,
    cast : [],
    genre : String,
    releaseDate : Date
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;