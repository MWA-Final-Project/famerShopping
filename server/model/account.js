const mongoose = require("mongoose");
const validator = require("validator");

const Account = mongoose.model("Account", {
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value))
        throw new Error("Error: Invalid email address");
    }
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = Account;