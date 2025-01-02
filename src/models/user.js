const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 50,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("email formate is wrong");
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("this is not strong password..");
        }
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("gender value in not correct");
        }
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLwzhli3UiGlUsTtOAoxA_f4dKRDG9DGa99w&s",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("photo url is wrong.");
        }
      },
    },
    about: {
      type: String,
      default: "this is default about value",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await JWT.sign({ _id: user._id }, "devMatch@123", {
    expiresIn: "1d",
  });
  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;
  const ispasswordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHash
  );
  return ispasswordValid;
};

module.exports = mongoose.model("User", userSchema);
