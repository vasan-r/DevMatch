const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(express.json());

const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const requestRoutes = require("./routes/requestRouters");

app.use("/", authRoutes);
app.use("/", profileRoutes);
app.use("/", requestRoutes);

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
