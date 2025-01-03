const express = require("express");
const profileRoutes = express.Router();
const { userAuth } = require("../middleware/auth");
const { validateEdit } = require("../utils/validation");

// for profile.
profileRoutes.get("/profile/view", userAuth, async (req, res) => {
  try {
    const { user } = req;
    res.send(user);
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

profileRoutes.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEdit(req)) {
      throw new Error("invalid Edits..");
    }

    const loggedInUser = req.user;
    Object.keys(req.body).forEach(
      (field) => (loggedInUser[field] = req.body[field])
    );
    loggedInUser.save();

    // res.send(`${loggedInUser.firstName}, profile updated sucessfull`);

    res.json({
      message: `${loggedInUser.firstName}, profile updated sucessfull`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(401).send("Error: " + err.message);
  }
});

module.exports = profileRoutes;
