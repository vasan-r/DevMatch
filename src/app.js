const express = require("express");

const app = express();

app.post("/test", (req, res, next) => {
  console.log("hello from test");
  // res.send("response from test api");
  next();
});
app.post("/test", (req, res, next) => {
  console.log("hello from test");
  // res.send("response from test api");
  next();
});
app.post("/test", (req, res, next) => {
  console.log("hello from test");
  // res.send("response from test api");
  next();
});
app.post("/test", (req, res, next) => {
  console.log("hello from test");
  // res.send("response from test api");
  next();
});
app.post("/test", (req, res, next) => {
  console.log("hello from test5");
  res.send("response from test api5");
  next();
});

app.listen(3000, () => {
  console.log("server is running sucessfully");
});
