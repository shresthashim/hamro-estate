const jwt = require("jsonwebtoken");
const { errorHandler } = require("./error");

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(errorHandler(401, "You are Unauthorized!"));
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(403, "Forbidden ! Token is not valid."));
    req.user = user;
    next();
  });
};
export default verifyToken;
