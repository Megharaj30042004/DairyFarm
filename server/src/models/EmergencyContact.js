import mongoose from "mongoose";

const emergencyContactSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    district: { type: String, default: "" },
    phone: { type: String, required: true },
    backupHelpline: { type: String, default: "" },
    note: { type: String, default: "" },
    priority: { type: String, default: "normal" }
  },
  {
    timestamps: true,
    collection: "emergency_contacts"
  }
);

export default mongoose.models.EmergencyContact ||
  mongoose.model("EmergencyContact", emergencyContactSchema);
