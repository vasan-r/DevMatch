const validators = require("validator");

const validationForSignup = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("name are not valid..");
  } else if (firstName.length > 50 || firstName.length < 4) {
    throw new Error("name should be lenghth of 4 - 50");
  } else if (!validators.isEmail(emailId)) {
    throw new Error("Emailid is wrong");
  }
  //   else if (!validators.isStrongPassword(password)) {
  //     console.log(password);
  //     throw new Error("password is not strong");
  //   }
};

const validateEdit = (req) => {
  const allowedEdit = [
    "firstName",
    "lastName",
    "emailId",
    "about",
    "skills",
    "age",
    "gender",
    "photoUrl",
  ];

  const isValidEdit = Object.keys(req.body).every((keys) =>
    allowedEdit.includes(keys)
  );
  return isValidEdit;
};
module.exports = { validationForSignup, validateEdit };
