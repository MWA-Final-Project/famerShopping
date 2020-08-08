const jwt = require("jsonwebtoken");
const config = require('./../config/config.json');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, config.secretKey);
    next();
  } catch (e) {
    res.status(401).json({ message: "Authentication failed" });
  }
};
