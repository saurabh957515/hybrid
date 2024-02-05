const express = require("express");
const app = express();
const port = process.env.PORT || "5000";
app.use(express.static("build"))
app.get("/api/users", (req, res) => {
  res.json([
    { name: "saurabh", role: "warrior" },
    {
      name: "shivam",
      role: "student",
    },
  ]);
});

app.listen(port, () => {
  `local hosting running on ${port}`;
});
