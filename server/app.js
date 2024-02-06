require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const indexRouter = require("./routes/index");
const port = process.env.PORT || "5000";
app.use(express.static("build"));
app.use("/", indexRouter);

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.log(`MongoDB connection error: ${error}`));
db.once("open", () => {
  console.log("Connected to mongoose");
});
app.listen(port, () => {
  console.log(`local hosting running on ${port}`);
});
