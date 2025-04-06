import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

const connectMongoDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: "hospital", //هون انا بحدد اسم الداتا بيس الي بدي ينتشأ
    });
    console.log("Connected to MongoDB.");
  } catch (error) {
    console.log("MongoDB connection error:", error);
  }
};
connectMongoDB();

export default connectMongoDB;
