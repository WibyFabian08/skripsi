const jwt = require("jsonwebtoken");

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    let decodeData;

    if (token) {
      decodeData = jwt.verify(token, "secret");

      req.user = decodeData?.data;

      next();
    } else {
      return res.status(403).json({
        success: false,
        message: "unauthorization",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "jwt expired"
    });
  }
};

module.exports = isAuth;
