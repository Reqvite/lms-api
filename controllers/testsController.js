const { Test } = require("../models/testModel");
const {
  addUserTest,
  getUserTestsResult,
  getAllUsersData,
} = require("../servive/testService");

const getTestsResultController = async (req, res) => {
  const data = await Test.find({}).sort({ _id: -1 }).limit(20);

  res.json({ status: "succes", code: 200, data });
};

const getAllUsersDataController = async (req, res) => {
  const data = await getAllUsersData();

  res.json({ status: "succes", code: 200, data });
};

const getUserTestsResultController = async (req, res) => {
  const { email } = req.user;

  const data = await getUserTestsResult(email);

  res.json({ status: "succes", code: 200, data });
};

const addUserTestsResultController = async (req, res) => {
  const { email, results, testTitle, cipher } = req.body;

  const data = await addUserTest(
    email,
    results,
    testTitle,
    cipher,
    req.testResult
  );

  res.json({ status: "succes", code: 201, data });
};

module.exports = {
  getTestsResultController,
  getUserTestsResultController,
  getAllUsersDataController,
  addUserTestsResultController,
};
