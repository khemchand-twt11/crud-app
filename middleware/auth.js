const jwt = require("jsonwebtoken");
require("dotenv").config();
const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  try {
    if (token) {
      let decoded = jwt.verify(token, process.env.KEY);
      req.body.userID = decoded.userID;
      next();
    } else {
      return res.status(400).send({
        msg: "this route is restricted, please ensure to pass a token",
      });
    }
  } catch (error) {
    res.send({ error: error.message });
  }
};

module.exports = { authMiddleware };
