import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {
    let { token } = req.cookies;
    if (!token) {
      return res
        .status(403)
        .json({ success: false, message: "User have not token" });
    }
    let verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!verifyToken) {
      return res.status(400).json({ success: false, message: "Invalid Token" });
    }
    req.userId = verifyToken.userId;
    next();
  } catch (er) {
    res.status(409).json({ success: false, message: er });
  }
};

export default isAuth;
