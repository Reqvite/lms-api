const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: [true, "Full name is required"],
  },
  results: {
    type: Array,
    default: null,
  },
  owner: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
});

const Test = mongoose.model("Test", testSchema);

module.exports = {
  Test,
};
