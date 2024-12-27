const express = require("express");

const connectDB = require("./config/database");
const app = express();
app.use(express.json());
const User = require("./models/user");

app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    console.log("user added");
    res.send("User added successfully");
  } catch (error) {
    res.status(500).send("error saving the user: " + error);
  }
});

connectDB()
  .then(() => {
    console.log("database connected sucessfully ...");
    app.listen(7777, () => {
      console.log("server is running sucessfully");
    });
  })
  .catch((err) => {
    console.error("database not connected!!!");
  });
