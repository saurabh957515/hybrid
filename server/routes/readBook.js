/** @format */

const express = require("express");
const router = express.Router();
router.get("/", async (req, res) => {
  // res.redirect("addbook");
  console.log('hello')
  res.json([
    { name: "saurabh", role: "warrior" },
    {
      name: "bad",
      role: "student",
    },
  ]);
});

module.exports = router;
