const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  RegistrationConflictError,
  NotAuthorizideError,
} = require("../helpers/errors");
const { User } = require("../models/userModel");

const registration = async (fullname, email, password) => {
  try {
    const user = new User({
      fullname,
      email,
      password,
    });
    await user.save();

    return {
      email: user.email,
    };
  } catch (err) {
    throw new RegistrationConflictError("Email in use");
  }
};

const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new NotAuthorizideError("Email or password is wrong");
  }

  const id = user._id;
  const token = jwt.sign(
    {
      _id: id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );
  await User.findByIdAndUpdate(id, {
    $set: { token },
  });
  return {
    token,
    user: {
      email: user.email,
    },
  };
};

module.exports = {
  registration,
  login,
};
