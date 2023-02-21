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
        name: user.fullname,
      },
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
      name: user.fullname,
    },
  };
};

const currentUser = async (token) => {
  if (!token) {
    throw new NotAuthorizideError("Not authorized");
  }
  const user = await User.findOne({ token }, { email: 1, fullname: 1, _id: 0 });
  return {
    user: {
      email: user.email,
      name: user.fullname,
    },
  };
};

const logout = async (id) => {
  if (!id) {
    throw new NotAuthorizideError("Not authorized");
  }
  await User.findByIdAndUpdate(id, {
    $set: { token: null },
  });
};

module.exports = {
  registration,
  login,
  currentUser,
  logout,
};
