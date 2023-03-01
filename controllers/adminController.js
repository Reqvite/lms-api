const { getAllUsersData, getUsers } = require("../servive/adminService");

const getAllUsersDataController = async (req, res) => {
  const { email, page, limit } = req.query;
  const data = await getAllUsersData(email, page, limit);
  res.json({ status: "succes", code: 200, data });
};

const getUsersController = async (req, res) => {
  const data = await getUsers();
  res.json({ status: "succes", code: 200, data });
};

module.exports = {
  getAllUsersDataController,
  getUsersController,
};
