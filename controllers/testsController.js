const { Test } = require("../models/testModel");
const { addUserTest, getUserTestsResult } = require("../servive/testService");

const getTestsResultController = async (req, res) => {
  const tests = await Test.find({});

  res.json({ status: "succes", code: 200, tests });
};

const getUserTestsResultController = async (req, res) => {
  const { email } = req.user;

  const data = await getUserTestsResult(email);

  res.json({ status: "succes", code: 200, data });
};

const addUserTestsResultController = async (req, res) => {
  const { email, results } = req.body;

  const data = await addUserTest(email, results);

  res.json({ status: "succes", code: 201, data });
};

module.exports = {
  getTestsResultController,
  getUserTestsResultController,
  addUserTestsResultController,
};
