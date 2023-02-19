const { Test } = require("../models/testModel");
const { User } = require("../models/userModel");

const getUserTestsResult = async (email) => {
  const { _id } = await User.findOne({ email });

  const userPosts = await Test.find({ owner: _id }).sort({ _id: -1 }).limit(20);

  return userPosts;
};

const addUserTest = async (email, results, testTitle, cipher, mark) => {
  const { fullname, _id } = await User.findOne({ email });
  const test = new Test({
    fullname,
    results,
    testTitle,
    cipher,
    mark,
    owner: _id,
  });

  await test.save();

  return test;
};
module.exports = {
  addUserTest,
  getUserTestsResult,
};
