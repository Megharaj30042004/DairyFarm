import mongoose from "mongoose";

export async function connectDatabase() {
  const mongoUri = process.env.MONGO_URI || process.env.mongo_uri;

  if (!mongoUri) {
    console.warn("MongoDB URI not found. Running with mock data only.");
    return false;
  }

  try {
    await mongoose.connect(mongoUri, {
      dbName: "dairyfarm"
    });
    console.log("MongoDB connected successfully.");
    return true;
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    return false;
  }
}
