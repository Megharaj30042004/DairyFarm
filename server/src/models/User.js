import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    passwordHash: { type: String, required: true },
    mobileNumber: { type: String, trim: true },
    village: { type: String, trim: true }
  },
  {
    timestamps: true,
    collection: "users"
  }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
