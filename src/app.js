const express = require("express");

const app = express();

app.use("/test", (req, res) => {
  res.send("hello from test");
});

app.use("/hello", function (req, res) {
  res.send("hello from hello");
});

app.use("/mango", function (req, res) {
  res.send("hello from mango");
});

app.use(function (req, res) {
  res.send("hello from server");
});

app.listen(3000, () => {
  console.log("server is running sucessfully");
});
