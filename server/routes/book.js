/** @format */

const express = require("express");
const router = express.Router();
const Author = require("../models/author");
const Book = require("../models/book");
const multer = require("multer");
const upload = multer({ dest: "public/images" });

router.get("/", async (req, res) => {
  let authorOptions = await Author?.find();
  authorOptions = authorOptions.map((author) => ({
    label: author?.name,
    value: author?._id,
  }));
  let query = Book.find();
  if (req.query.title) {
    query = query.regex("title", new RegExp(req.query.title, "i"));
  }
  if (req.query.publishedBefore) {
    query = query.lte("publishDate", req.query.publishedBefore);
  }
  if (req.query.publishedAfter) {
    query = query.lte("publishDate", req.query.publishedAfter);
  }

  try {
    const books = await query.exec();
    res.send({
      books: books,
      searchOptions: authorOptions,
    });
  } catch (error) {
    console.error(error);
    res.send(error);
  }
});

router.post("/", upload.single("coverImage"), async (req, res) => {
  console.log(req?.file?.filename);
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    publishDate: new Date(req.body.publishDate),
    pageCount: req.body.pageCount,
    description: req.body.description,
    coverImage: req?.file?.filename || null,
  });
  try {
    const newBook = await book.save();
    res.send(newBook);
  } catch (error) {
    res.send(error);
    // if (req.file) {
    //   fs.unlink(path.join(__dirname, "public/images", req?.file?.filename));
    // }
    // renderNewPage(res, book, error);
  }
});

// Show Book Route
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate("author").exec();
    res.render("books/show", { book: book });
  } catch {
    res.redirect("/");
  }
});

// Update Book Route
router.put("/:id", upload.single("coverImage"), async (req, res) => {
  let book;

  try {
    book = await Book.findById(req.params.id);
    book.title = req.body.title;
    book.author = req.body.author;
    book.publishDate = new Date(req.body.publishDate);
    book.pageCount = req.body.pageCount;
    book.description = req.body.description;
    (book.coverImage = req?.file?.filename || null), await book.save();
    res.send("book updated successfully");
  } catch {
    res.send("book updated successfully");
  }
});

// Delete Book Page
router.delete("/:id", async (req, res) => {
  console.log("i am comming");
  let book;
  try {
    book = await Book.findById(req.params.id);
    await book.deleteOne();
    res.send("books deleted successfully");
  } catch (error) {
    res.send({ errors: error });
  }
});
// one  comment added

module.exports = router;
