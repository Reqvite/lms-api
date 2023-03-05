const { WrongParametersError } = require("../helpers/errors");
const { Test } = require("../models/testModel");
const { User } = require("../models/userModel");

const getAllUsersTests = async (email, page, limit) => {
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

const getUsers = async () => {
  const data = await User.find(
    {},
    { role: 0, token: 0, password: 0, __v: 0 }
  ).sort({ _id: -1 });
  return { data };
};

const removeUser = async (userId) => {
  const user = await User.findByIdAndRemove(userId);

  if (!user) {
    throw new WrongParametersError(`Not found`);
  }
  return { userId };
};

module.exports = {
  getAllUsersTests,
  getUsers,
  removeUser,
};
