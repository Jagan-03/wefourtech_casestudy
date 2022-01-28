const express = require("express");
const router = express.Router();

// Models
const Movie = require("../models/movie.js");

const isAuth = (req, res, next) => {
    if(req.session.isAuth) next();
    else res.send("Session ended");
}

router.get("/", async (req, res) => {
  try {
      const movies = await Movie.find({}).exec();
      res.send(movies);
  } catch (error) {
      res.send(error);
  }
});

router.post("/", async(req, res) => {
    try {
        const newMovie = new Movie(req.body);
        await newMovie.save();
        
        req.session.isAuth = true;
        res.send("Movie added successfully");
    } catch (error) {
        res.send(error);
    }
})

router.patch("/", isAuth, async(req, res) => {
    try {
        const movieToUpdate = req.body;
        await Movie.findByIdAndUpdate(movieToUpdate._id, movieToUpdate);

        res.send("Movie details updated successfully");
    } catch (error) {
        res.send(error);
    }
})

router.delete("/", isAuth, async(req, res) => {
    try {
        const { _id } = req.body;
        await Movie.findByIdAndDelete(_id);

        res.send("Movie Deleted Successfully");
    } catch (error) {
        res.send(error);
    }
})

module.exports = router;

