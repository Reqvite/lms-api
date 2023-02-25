const { Test } = require("../models/testModel");
const { User } = require("../models/userModel");
const { NoPermissionsError } = require("../helpers/errors");

const getUserTestsResult = async (email) => {
  const { _id, testResults } = await User.findOne({ email });

  const userTests = await Test.find({ owner: _id }).sort({ _id: -1 }).limit(20);

  return { userTests, finishTests: testResults };
};
const getAllUsersData = async (_id) => {
  const user = await User.findById({ _id });

  if (user.role !== "admin") {
    throw new NoPermissionsError(
      "403 Forbidden – you dont have permission to access this resource."
    );
  }
  const data = await Test.find({}).sort({ _id: -1 });

  // const userTests = await Test.find({ owner: _id }).sort({ _id: -1 }).limit(20);

  return { data };
};

const addUserTest = async (email, results, testTitle, cipher, mark) => {
  const { fullname, _id } = await User.findOne({ email });

  const resultArray = mark.correct.split("/");
  if (resultArray[0] === resultArray[1]) {
    await User.findByIdAndUpdate(_id, {
      $addToSet: { testResults: cipher },
    });
  }

  const test = new Test({
    fullname,
    email,
    results,
    testTitle,
    cipher,
    mark,
    owner: _id,
  });

  await test.save();

  return { mark };
};
module.exports = {
  addUserTest,
  getUserTestsResult,
  getAllUsersData,
};
