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

//  get user by email id.

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    const user = await User.findOne({ emailId: userEmail });
    if (user.length === 0) {
      res.status(401).send("user not found");
    } else {
      res.send(user);
    }
  } catch {
    res.status(401).send("something went wrong");
  }
});

// delete the data

app.delete("/delete", async (req, res) => {
  const userid = req.body.userid;
  try {
    const user = await User.findByIdAndDelete(userid);
    res.send("user delete sucessfully");
  } catch (err) {
    res.status(401).res("something went wrong");
  }
});

// updata user data

app.patch("/update", async (req, res) => {
  const userid = req.body.userid;
  const data = req.body;
  try {
    const user = await User.findByIdAndUpdate(userid, data, {
      returnDocument: "before",
      runValidators: true,
    });
    res.send("document updated sucessfully");
  } catch (err) {
    res.status(500).send("update failed" + err.message);
  }
});

// fetch all data.
app.get("/feed", async (req, res) => {
  const users = await User.find({});
  try {
    res.send(users);
  } catch {
    res.status(500).send("somethings went wrong");
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
