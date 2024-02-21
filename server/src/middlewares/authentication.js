const { verifyToken } = require("../services/token.services");

const checkForAuth = (cookieName) => {
  return (req, res, next) => {
    const token = req.cookies[cookieName];
    // console.log(req.cookies, "Token nahi aara");
    // console.log(req.url)
    if(req.url === "/user/auth/login" || req.url === "/user/auth/signup"){
      return next();
    }
    if (!token)
      return res.json({ status: 401, errorMessage: "Authentication failed" });

    const user = verifyToken(token);
    // console.log("User...........", user);
    req.user = user;
    return next();
  };
};

module.exports = { checkForAuth };
