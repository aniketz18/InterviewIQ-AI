import generateToken from "../configs/generateToken.js";
import User from "../models/user.model.js";

const registerUser = async (req, res) => {
  try {
    const { username, email } = req.body;
    if (!username || !email) {
      return res.status(400).json("User name or email is required");
    }
    const user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        username,
        email,
      });
    }
    const token = generateToken(user._id);
    res.cookie("token", token, {
      http: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({success: true , message : "user authenticated success", user});
  } catch (er) {
    res.status(500).json({ success: false, message: er });
  }
};

const logout = async (req, res) => {
  try {
    await res.clearCookie("token");
    return res
      .status(200)
      .json({ success: true, message: "Logout Successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: er });
  }
};

export { registerUser, logout };
