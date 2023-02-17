const mongoose = require("mongoose");

const testAnswerSchema = new mongoose.Schema({
  cipher: {
    type: String,
    required: [true, "Cipher  is required"],
  },
  title: {
    type: String,
  },
  answers: {
    type: Array,
  },
  owner: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
});

const TestAnswer = mongoose.model("Answer", testAnswerSchema);

module.exports = {
  TestAnswer,
};
