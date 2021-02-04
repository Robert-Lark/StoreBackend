const express = require("express");
const router = express.Router();
const Library = require("../models/Library");
const { checkJwt } = require("../authz/check-jwt");



//Get users entire Library

router.get("/", checkJwt, async (req, res) => {
  try{
    const library = await Library.find();
    res.json(library)
  }
  catch(err){
    res.status(400).json({message: err})
  }
});

//Get users Top Ten

router.get("/topTen", (req, res) => {
  res.send("We are on library");
});

//Show what the user has in their cart

router.get("/cart", (req, res) => {
  res.send("We are on library");
});

//Update the library

router.post("/", async (req, res) => {
  const libraryPost = new Library({
    topTen: req.body.topTen,
    inCart: req.body.inCart,
  });
  const savedLibraryPost = await libraryPost.save();
  try {
    res.status(200).json(savedLibraryPost);
  } catch (err) {
    res.status(400).json({message: err});
  }
});

module.exports = router;
