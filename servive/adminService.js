const { WrongParametersError } = require("../helpers/errors");
const { Test } = require("../models/testModel");
const { User } = require("../models/userModel");

const getAllUsersTests = async (email, startDate, endDate) => {
  let searchParams;

  if (!email && !startDate && !endDate) {
    searchParams = {};
  } else if (email && !startDate && !endDate) {
    searchParams = { email };
  } else if (!email && startDate && endDate) {
    searchParams = { createdAt: { $gte: startDate, $lte: endDate } };
  } else {
    searchParams = {
      email,
      createdAt: { $gte: startDate, $lte: endDate },
    };
  }

  const data = await Test.find(searchParams).sort({ _id: -1 });

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

  await Test.deleteMany({ owner: user._id });

  return { userId };
};

module.exports = {
  getAllUsersTests,
  getUsers,
  removeUser,
};
