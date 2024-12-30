const express = require("express");
const connectDB = require("./config/database");
const app = express();

app.use(express.json());
const User = require("./models/user");
const { validationForSignup } = require("./utils/validation");
const bcrypt = require("bcrypt");

// for login
app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credential");
    }
    const ispassword = await bcrypt.compare(password, user.password);
    if (!ispassword) {
      throw new Error("Invalid credential");
    } else {
      res.send("login sucessfull!!");
    }
  } catch (err) {
    res.status(500).send("error: " + err.message);
  }
});

//  for signup
app.post("/signup", async (req, res) => {
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

app.patch("/update/:userid", async (req, res) => {
  const userid = req.params?.userid;
  const data = req.body;

  try {
    const ALLOWED_UPDATEDS = ["age", "gender", "photoUrl", "about", "skills"];
    const isUPDATE_VALID = Object.keys(data).every((k) =>
      ALLOWED_UPDATEDS.includes(k)
    );

    if (!isUPDATE_VALID) {
      throw new Error("Update not allowed");
    }

    if (data?.skills.length > 10) {
      throw new Error("skills cannot be more than 10");
    }

    const user = await User.findByIdAndUpdate(userid, data, {
      returnDocument: "before",
      runValidators: true,
    });

    res.send("document updated sucessfully");
  } catch (err) {
    res.status(500).send("update failed " + err.message);
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
