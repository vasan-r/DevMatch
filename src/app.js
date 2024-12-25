const express = require("express");

const app = express();

app.get("/test", (req, res) => {
  res.send({ fistname: "vasan", lastName: "r" });
});

app.post("/test", (req, res) => {
  res.send("database was sucessfully created");
});

app.delete("/test", (req, res) => {
  res.send("database deleted sucessfully");
});

app.patch("/test", (req, res) => {
  res.send("database updated sucessfully");
});

app.use("/test", (req, res) => {
  res.send("hello from test");
});

app.use("/", function (req, res) {
  res.send("hello from empty ");
});

app.use("/hello", function (req, res) {
  res.send("hello from hello");
});

app.listen(3000, () => {
  console.log("server is running sucessfully");
});
