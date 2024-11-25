import mongoose from "mongoose";

// Connect to MongoDB using Mongoose
export async function connectDB() {
  try {
    await mongoose.connect("mongodb://localhost:27017/anonymousChats");
    console.log("MongoDB connected");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Exit the process with failure
  }
}
