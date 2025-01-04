const mongoos = require("mongoose");

const connectionRequestSchema = new mongoos.Schema(
  {
    fromUserId: {
      type: mongoos.Schema.Types.ObjectId,
      require: true,
    },
    toUserId: {
      type: mongoos.Schema.Types.ObjectId,
      require: true,
    },
    status: {
      type: String,
      require: true,
      enum: {
        values: ["interested", "accepted", "rejected", "ignored"],
        message: `{VALUE} is incorrect status type`,
      },
    },
  },
  {
    timestamps: true,
  }
);

connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });
connectionRequestSchema.pre("save", function (next) {
  const connectionRequest = this;
  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error("cannot send connection Request to yourself..");
  }
  next();
});
const ConnectionRequest = new mongoos.model(
  "ConnectionRequest",
  connectionRequestSchema
);
module.exports = ConnectionRequest;
