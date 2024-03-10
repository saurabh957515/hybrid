/** @format */

const express = require("express");
const router = express.Router();
const Book = require("../models/book");
const multer = require("multer");
const upload = multer({ dest: "public/books" });

router.post("/", upload.single("book"), async (req, res) => {
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    publishDate: new Date(req.body.publishDate),
    pageCount: req.body.pageCount,
    description: req.body.description,
    coverImage: req?.file?.filename || null,
    book: req?.file?.filename || null,
  });
  try {
    const newBook = await book.save();
    res.send(newBook);
  } catch (error) {
    res.send(error);
  }
});

router.get('/time',async(req,res)=>{
  console.log(req?.query)
  res.send("hello i am gonna send the time")
})

module.exports = router;
