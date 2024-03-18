const express = require("express");
const User = require("../models/user");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authCheck = require("./authmiddleware");

router.post("/signup", async (req, res) => {
  console.log(req?.body);
  const { username, name, email, password } = req?.body;

  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.send("Email already exists. Please use a different email.");
    }

    if (name && username && password && email) {
      const salt = await bcrypt.genSalt(10);
      const hasPassword = await bcrypt.hash(password, salt);
      const newUser = await User.create({
        name: name,
        email: email,
        password: hasPassword,
        username: username,
      });
      await newUser.save();
      const saved_user = await User.findOne({ username: username });
      // Generate JWT tokken
      const token = jwt.sign(
        { userID: saved_user._id },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "1d",
        }
      );
      console.log(token);
      return res.send({ message: "Registration successful.", token: token });
    } else {
      return res.status(400).send("All fields are required.");
    }
  } catch (error) {
    console.error("Error occurred:", error);
    return res.status(500).send("Internal server error.");
  }
});
router.post("/login", async (req, res) => {
  const { username, password } = req?.body;
  let user = await User.findOne({ username: username });
  if (user) {
    const match = await bcrypt.compare(password, user?.password);
    console.log(match, "matching ");
    // Generate JWT tokken
    const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    res.send({ message: "logIn successful.", token: token });
  }
});

module.exports = router;
