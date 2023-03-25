const express = require("express");
const userRoute = express.Router();
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { userModel } = require("../models/user.model");

//REGISTERATION
userRoute.post("/register", async (req, res) => {
  const { name, email, pass } = req.body;
  if (!name || !email || !pass)
    return res.status(400).send({ msg: "please type all the details!" });

  try {
    const user = await userModel.findOne({ email: email });

    if (user) {
      res.send({ msg: "user already exist" });
    } else {
      bcrypt.hash(pass, 8, (err, hash) => {
        const newUser = new userModel({ name, email, pass: hash });
        newUser.save();
        res.send({ msg: "user registere successfully!" });
      });
    }
  } catch (error) {
    res.send({ msg: error.message });
  }
});

userRoute.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (user) {
      let result = await bcrypt.compare(pass, user.pass);
      if (result) {
        res.status(200).send({
          status: "successful",
          token: jwt.sign({ userID: user._id }, process.env.KEY, {
            expiresIn: "5h",
          }),
        });
      } else {
        res.status(400).send({ msg: "wrong credentials" });
      }
    } else {
      res.status(400).send({ msg: "user doesn't exits, register first" });
    }
  } catch (error) {}
});

module.exports = { userRoute };
