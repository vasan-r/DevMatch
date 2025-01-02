const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validationForSignup } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const JWT = require("jsonwebtoken");
const { userAuth } = require("./middleware/auth");

app.use(cookieParser());
app.use(express.json());

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

// for login
app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credential");
    }
    const ispassword = await user.validatePassword(password);
    if (!ispassword) {
      throw new Error("Invalid credential");
    } else {
      // Create a JWT token.
      const token = await user.getJWT();

      //Add the token to cookie send the respone back to the client

      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.send("login sucessfull!!");
    }
  } catch (err) {
    res.status(500).send("error: " + err.message);
  }
});

// for profile.
app.get("/profile", userAuth, async (req, res) => {
  try {
    const { user } = req;
    res.send(user);
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

app.post("/sendConnectionRequest", userAuth, (req, res) => {
  const { user } = req;

  res.send(user.firstName + " send the connection request..");
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
