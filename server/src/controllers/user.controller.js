const User = require("../models/userSchema");
const { generateToken } = require("../services/token.services");

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (await User.findOne({ username })) {
      return res.json({
        status: false,
        errorMessage: "Username already in use, please try with other username",
      });
    }

    if (await User.findOne({ email })) {
      return res.json({
        status: false,
        errorMessage: "Email already in use, please try with other mail",
      });
    }

    const data = {
      username,
      email,
      password,
    };
    const newUser = await User.create(data);

    delete newUser.password;

    const token = generateToken(newUser);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.json(error);
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.json({
        status: false,
        errorMessage: "Account does not exist!",
      });
    }

    if (!(await user.isPasswordMatch(password))) {
      return res.json({
        status: false,
        errorMessage: "Incorrect Password!",
      });
    }

    const token = generateToken(user);
    // console.log(token, "Tokennnnnn");

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    res.json({ status: 200 });
  } catch (error) {
    console.log(error);
    res.json(error.message);
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.json({ status: 200, successMessage: "Logout successfully" });
  } catch (error) {
    res.json(error.message);
  }
};

module.exports = { signup, login, logout };
