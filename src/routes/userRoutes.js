const express = require("express");
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");
const { find } = require("../models/user");
const userRoutes = express.Router();

const UserSafeDate = "firstName lastName about photoUrl";

userRoutes.get("/user/request/pending", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequest = await ConnectionRequest.find({
      status: "interested",
      toUserId: loggedInUser._id,
    }).populate("fromUserId", UserSafeDate);

    // }).populate("fromUserId", ["firstName", "lastName"]);

    res.json({ message: "data fetch sucessfully..", data: connectionRequest });
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
});

userRoutes.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInuser = req.user;

    const connectionRequest = await ConnectionRequest.find({
      $or: [
        { fromUserId: loggedInuser._id, status: "accepted" },
        { toUserId: loggedInuser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", UserSafeDate)
      .populate("toUserId", UserSafeDate);

    const data = connectionRequest.map((row) => {
      if (row.fromUserId._id.toString() === loggedInuser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });

    res.json(data);
  } catch (err) {
    res.status(404).send("Error: " + err.message);
  }
});

module.exports = userRoutes;
