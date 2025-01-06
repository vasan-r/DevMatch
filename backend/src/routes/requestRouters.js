const express = require("express");
const requestRouters = express.Router();
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

requestRouters.post(
  "/request/send/:status/:toUserid",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserid;
      const status = req.params.status;

      const allowedStatus = ["interested", "ignored"];
      if (!allowedStatus.includes(status)) {
        return res
          .status(400)
          .json({ message: "invalid status type: " + status });
      }

      const toUser = await User.findById(toUserId);
      if (!toUser) {
        res.status(400).json({ message: "toUser not find in database." });
      }

      const existingConnectRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (existingConnectRequest) {
        return res.status(400).json({ message: "connection is already exit" });
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();

      res.json({
        message:
          req.user.firstName + " is " + status + " in " + toUser.firstName,
        data,
      });
    } catch (err) {
      res.status(400).send("Error: " + err.message);
    }
  }
);

requestRouters.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const { status, requestId } = req.params;
      const loggedInUser = req.user;

      // check status is valid or not.
      const validStatus = ["accepted", "rejected"];

      if (!validStatus.includes(status)) {
        return res.status(404).json({ message: "invalid status !!" });
      }

      // chech requestId is valid or not.

      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
      });

      if (!connectionRequest) {
        return res
          .status(404)
          .json({ message: "invalid connection request.." });
      }

      connectionRequest.status = status;
      const data = await connectionRequest.save();
      res.json({
        message:
          loggedInUser.firstName + " " + status + " connection request..",
        data,
      });
    } catch (err) {
      res.status(404).send("Error: " + err.message);
    }
  }
);

module.exports = requestRouters;
