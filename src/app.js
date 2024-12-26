const express = require("express");
const { adminAuth, userAuth } = require("./middleware/auth");

const app = express();

app.use("/admin", adminAuth);

app.get("/admin/getAllData", (req, res) => {
  res.send("all data send successfully");
});

app.get("/admin/deleteAllData", (req, res) => {
  res.send("all data delete successfully");
});

app.use("/user", userAuth, (req, res) => {
  res.send("send all user data");
});

app.listen(3000, () => {
  console.log("server is running sucessfully");
});
