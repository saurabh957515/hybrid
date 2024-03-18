/** @format */

const express = require("express");
const User = require("../models/user");
const router = express.Router();
const jwt = require("jsonwebtoken");

var checkUserAuth = async (req, res, next) => {
  let token;
  const { authorization } = req?.headers;
  if (authorization && authorization.startsWith("Bearer")) {
    try {
      token = authorization.split(" ")[1];
      const { userId } = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = await User.findById(userId).select("-password");
      if (req.user) {
        next();
      }
    } catch (error) {
      console.error(error);
      res.send.status(500)({ message: "unauthorized user" });
    }
  }
};
module.exports = checkUserAuth;
