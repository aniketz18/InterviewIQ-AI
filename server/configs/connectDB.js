import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("DataBase Connected");
  } catch (error) {
    console.error(`Database error : ${error}`);
  }
};

export default connectDB;
