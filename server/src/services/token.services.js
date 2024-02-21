const jwt = require("jsonwebtoken");
const secret = "Keyforgeneratingtokens!@#$";

const generateToken = (user) => {
  const payload = {
    id: user._id,
    username: user.username,
    role: user.role,
    email: user.email,
  };

  return jwt.sign(payload, secret);
};

const verifyToken = (token) => {
  return jwt.verify(token, secret);
};

module.exports = { generateToken, verifyToken };
