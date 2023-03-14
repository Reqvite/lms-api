const {
  getAllUsersTests,
  getUsers,
  removeUser,
} = require("../servive/adminService");

const getAllUsersTestsController = async (req, res) => {
  const { email, startDate, endDate } = req.query;
  const data = await getAllUsersTests(email, startDate, endDate);
  res.json({ status: "succes", code: 200, data });
};

const getUsersController = async (req, res) => {
  const data = await getUsers();
  res.json({ status: "succes", code: 200, data });
};

const removeUserController = async (req, res, next) => {
  const data = await removeUser(req.params.userId);
  res.json({
    status: "success",
    code: 200,
    data,
    message: "User deleted",
  });
};

module.exports = {
  getAllUsersTestsController,
  getUsersController,
  removeUserController,
};
