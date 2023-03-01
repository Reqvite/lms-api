const { User } = require("../models/userModel");

const { NoPermissionsError } = require("../helpers/errors");

const adminMiddleware = async (req, res, next) => {
  try {
    const user = await User.findById({ _id: req.user._id });
    if (user.role !== "admin") {
      throw new NoPermissionsError("403 Forbidden");
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  adminMiddleware,
};
