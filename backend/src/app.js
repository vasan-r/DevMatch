const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const requestRoutes = require("./routes/requestRouters");
const userRoutes = require("./routes/userRoutes");

app.use("/", authRoutes);
app.use("/", profileRoutes);
app.use("/", requestRoutes);
app.use("/", userRoutes);

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
