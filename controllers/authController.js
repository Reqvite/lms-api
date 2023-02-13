const { registration, login } = require("../servive/authService");

const registrationController = async (req, res) => {
  const { fullname, email, password } = req.body;
  const user = await registration(fullname, email, password);
  res.status(201).json({ status: "Created", code: 201, user });
};

const loginContoller = async (req, res) => {
  const { email, password } = req.body;
  const token = await login(email, password);
  res.status(200).json({ status: "Success", code: 200, token });
};

module.exports = {
  registrationController,
  loginContoller,
};
