const express = require("express");
const router = express.Router();
router.get("/api/users", async (req, res) => {
  res.json([
    { name: "saurabh", role: "warrior" },
    {
      name: "bad",
      role: "student",
    },
  ]);
});

module.exports = router;
