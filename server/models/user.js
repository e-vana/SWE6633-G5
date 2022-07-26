const mongoose = require("mongoose");

let userSchema = mongoose.Schema(
  {
    fname: {
      type: String,
    },
    lname: {
      type: String,
    },
    email: {
      type: String,
    },
    role: {
      type: String,
    },
    mobileNumber: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

let User = mongoose.model("User", userSchema);

module.exports = User;
