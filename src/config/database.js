const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://vasan:rC65aNgsONE1EIzB@nodejs.ve9gv.mongodb.net/devMatch?retryWrites=true&w=majority&appName=NodeJs"
    );
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
  }
};

module.exports = connectDB;
