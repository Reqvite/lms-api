const mongoose = require("mongoose");

const testAnswerSchema = new mongoose.Schema({
  cipher: {
    type: String,
    required: [true, "Cipher  is required"],
  },
  title: {
    type: String,
    required: [true, "Title  is required"],
  },
  answers: {
    type: Array,
    required: [true, "Answers  are required"],
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
