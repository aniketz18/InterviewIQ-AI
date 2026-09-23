import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      unique: true,
      require: true,
    },
    credit: {
      type: Number,
      default: 100,
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;
