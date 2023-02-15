const { registration, login, currentUser } = require("../servive/authService");

const registrationController = async (req, res) => {
  const { fullname, email, password } = req.body;
  const data = await registration(fullname, email, password);
  res.status(201).json({ status: "Created", code: 201, data });
};

const loginContoller = async (req, res) => {
  const { email, password } = req.body;
  const data = await login(email, password);
  res.status(200).json({ status: "Success", code: 200, data });
};

const currentUserContoller = async (req, res) => {
  const data = await currentUser(req.user.token);
  res.status(200).json({ status: "OK", code: 200, data });
};

module.exports = {
  registrationController,
  loginContoller,
  currentUserContoller,
};
