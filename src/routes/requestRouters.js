const express = require("express");
const requestRouters = express.Router();
const { userAuth } = require("../middleware/auth");

requestRouters.post("/sendConnectionRequest", userAuth, (req, res) => {
  const { user } = req;

  res.send(user.firstName + " send the connection request..");
});

module.exports = requestRouters;
