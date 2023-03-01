const { Test } = require("../models/testModel");
const { User } = require("../models/userModel");

const getAllUsersData = async (email, page, limit) => {
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
  const data = await User.find({});

  return { data };
};

module.exports = {
  getAllUsersData,
  getUsers,
};
