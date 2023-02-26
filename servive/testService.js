const { Test } = require("../models/testModel");
const { User } = require("../models/userModel");
const { NoPermissionsError } = require("../helpers/errors");

const getUserTestsResult = async (email) => {
  const { _id, testResults } = await User.findOne({ email });

  const userTests = await Test.find({ owner: _id }).sort({ _id: -1 }).limit(20);

  return { userTests, finishTests: testResults };
};

const getAllUsersData = async (_id, email, page, limit) => {
  const user = await User.findById({ _id });
  if (user.role !== "admin") {
    throw new NoPermissionsError("403 Forbidden");
  }

  let searchParams;

  if (email?.includes("@")) {
    searchParams = email ? { email } : {};
  } else {
    const fullname = email;
    searchParams = fullname ? { fullname } : {};
  }

  const skip = (page - 1) * limit;
  const data = await Test.find(searchParams)
    .skip(skip)
    .limit(limit)
    .sort({ _id: -1 });

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
