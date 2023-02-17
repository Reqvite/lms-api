const { RestApiError } = require("./errors");

const asyncWrapper = (controller) => {
  return (req, res, next) => {
    controller(req, res).catch(next);
  };
};

const errorHandler = (err, req, res, next) => {
  if (err instanceof RestApiError) {
    return res
      .status(err.status)
      .json({ status: err.type, code: err.status, message: err.message });
  }
  res.status(500).json({ message: err.message });
};

const countTestResult = (userResults, answers) => {
  let total = 0;
  let count = 0;
  for (const result of userResults) {
    if (+result === +answers[count]) {
      total += 5;
    }
    count += 1;
  }
  return total;
};

module.exports = {
  countTestResult,
  errorHandler,
  asyncWrapper,
};
