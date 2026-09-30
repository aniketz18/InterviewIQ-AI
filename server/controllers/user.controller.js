import User from "../models/user.model.js";
export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User is not Found" });
    }
    // if user found
    return res.status(200).json(user);
  } catch (er) {
    res.status(500).json({
      success: false,
      message: "Failed to get curent user",
      error: er.message,
    });
  }
};
