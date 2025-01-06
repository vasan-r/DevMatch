const express = require("express");
const authRoutes = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

const { validationForSignup } = require("../utils/validation");

//  for signup
authRoutes.post("/signup", async (req, res) => {
  try {
    // validate the user
    validationForSignup(req);

    // encrypt the password
    const { firstName, lastName, emailId, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    // create the user

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save();
    console.log("user added");
    res.send("User added successfully");
  } catch (error) {
    res.status(500).send("error: " + error);
  }
});

// for login
authRoutes.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credential");
    }
    const ispassword = await user.validatePassword(password);
    if (!ispassword) {
      throw new Error("Invalid credential");
    } else {
      // Create a JWT token.
      const token = await user.getJWT();

      //Add the token to cookie send the respone back to the client

      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.send(user.firstName + " login sucessfull!!");
    }
  } catch (err) {
    res.status(500).send("error: " + err.message);
  }
});

// for logout.
authRoutes.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("logout sucessfull ..");
});

module.exports = authRoutes;
