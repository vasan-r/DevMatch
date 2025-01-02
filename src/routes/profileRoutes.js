const express = require("express");
const profileRoutes = express.Router();
const { userAuth } = require("../middleware/auth");

// for profile.
profileRoutes.get("/profile", userAuth, async (req, res) => {
  try {
    const { user } = req;
    res.send(user);
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

module.exports = profileRoutes;
