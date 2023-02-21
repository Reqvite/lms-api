const { countTestResult } = require("../helpers/apiHelpers");
const { TestAnswer } = require("../models/testAnswerModel");

const testResultMiddleware = async (req, res, next) => {
  const { results, cipher } = req.body;
  try {
    const { answers } = await TestAnswer.findOne({ cipher });
    const result = countTestResult(results, answers);

    req.testResult = result;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  testResultMiddleware,
};
