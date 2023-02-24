const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: [true, "Full name is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  token: {
    type: String,
    default: null,
  },
  testResults: {
    type: Array,
    default: [],
  },
  role: {
    type: String,
    enum: ["admin", "student"],
    default: "student",
  },
  // avatarURL: String,
  // subscription: {
  //   type: String,
  //   enum: ["starter", "pro", "business"],
  //   default: "starter",
  // },
  // verify: {
  //   type: Boolean,
  //   default: false,
  // },
  // verificationToken: {
  //   type: String,
  //   required: [true, "Verify token is required"],
  // },
});

userSchema.pre("save", async function () {
  if (this.isNew) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};
