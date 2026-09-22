import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
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

export default User = mongoose.model("User", userSchema);
