import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    passwordHash: { type: String, required: true },
    mobileNumber: { type: String, trim: true },
    village: { type: String, trim: true },
    dailyChatCount: { type: Number, default: 0 },
    lastChatDate: { type: String, default: "" }
  },
  {
    timestamps: true,
    collection: "users"
  }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
