/** @format */

const express = require("express");
const router = express.Router();
const Book = require("../models/book");
const LogTime = require("../models/timer");
const multer = require("multer");
const upload = multer({ dest: "public/books" });
const moment = require("moment");
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

router.get("/time", async (req, res) => {
  const logDate = moment(req?.query?.date).startOf("day"); // Get the start of the day for the provided date timer

  // Get the end of the day for the provided date
  const endDate = moment(logDate).endOf("day");

  // Querying the database for documents created within the date range
  const logTime = await LogTime.findOne({
    createdAt: {
      $gte: logDate.toDate(), // Convert Moment object to Date object
      $lt: endDate.toDate(), // Convert Moment object to Date object
    },
  });

  // If no document is found for the provided date, create a new one
  if (!logTime) {
    const newLog = new LogTime({});
    await newLog.save();
  } else {
    logTime.Timelog.push(req?.query?.time );
    await logTime.save();
  }
  console.log(logTime);
  res.send("hello i am gonna send the time");
});

module.exports = router;
