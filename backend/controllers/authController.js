const User = require("../models/User");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signUp = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      return res.status(409).json({
        success: false,
        message: "email already use",
        data: {},
      });
    }

    let newUser = new User(req.body);

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    newUser.password = hashedPassword;

    await newUser.save();

    return res.status(200).json({
      success: true,
      message: "sign up success",
      data: newUser,
    });
  } catch (err) {
    return res.status(500).json({
      succes: false,
      message: err.stack,
      data: {},
    });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
        data: {},
      });
    }

    const isPasswordTrue = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordTrue) {
      return res.status(404).json({
        success: false,
        message: "wrong password",
        data: {},
      });
    }

    const token = jwt.sign(
      {
        data: user,
      },
      "secret",
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      success: true,
      message: "Login Success",
      token,
    });
  } catch (err) {
    return res.status(500).json({
      succes: false,
      message: err.stack,
      data: {},
    });
  }
};
