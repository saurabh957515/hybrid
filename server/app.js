/** @format */
require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const fs = require("fs");
const port = process.env.PORT || "5000";
const bodyParser = require("body-parser");
const indexRouter = require("./routes/index");
const bookRouter = require("./routes/book");
const authorRouter = require("./routes/author");
const readBookRouter = require("./routes/readBook");
const userRouter = require("./routes/user");
const authCheck = require("./routes/authmiddleware");
app.use(express.static("public/images"));
app.use(express.static("public/books"));
const cors = require('cors');
// parse application/json
app.use(cors());
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this origin
  optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
})) 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api/auth", userRouter);
app.use("/api/index", indexRouter);
const path = require("path");
app.use("/api/book", authCheck, bookRouter);
app.use("/api/author", authCheck, authorRouter);
app.use("/api/readbook", authCheck, readBookRouter);
app.get("*", async (req, res) =>
  res.sendFile(path.join(__dirname, "dist", "index.html"))
);
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.log(`MongoDB connection error: ${error}`));
db.once("open", () => {
  console.log("Connected to mongoose");
});
app.listen(port, () => {
  console.log(`local hosting running on ${port}`);
});
