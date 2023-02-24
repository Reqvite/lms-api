const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: [true, "Full name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  results: {
    type: Array,
    required: [true, "Results  is required"],
  },
  mark: {
    type: Object,
    required: [true, "Mark  is required"],
  },
  cipher: {
    type: String,
    required: [true, "Cipher  is required"],
  },
  testTitle: {
    type: String,
    required: [true, "Test title  is required"],
  },
  createdAt: { type: Date, default: Date.now },
  owner: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
});

const Test = mongoose.model("Test", testSchema);

module.exports = {
  Test,
};
