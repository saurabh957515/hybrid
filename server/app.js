const express = require("express");
const app = express();
const indexRouter = require("./routes/index");
const port = process.env.PORT || "5000";
app.use(express.static("build"));
app.use("/", indexRouter);

app.listen(port, () => {
  `local hosting running on ${port}`;
});
