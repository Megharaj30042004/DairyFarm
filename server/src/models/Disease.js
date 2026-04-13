import mongoose from "mongoose";

const diseaseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    symptoms: { type: String, required: true },
    medicalIssues: { type: String, required: true },
    recovery: { type: String, required: true }
  },
  {
    timestamps: true,
    collection: "diseases"
  }
);

export default mongoose.models.Disease || mongoose.model("Disease", diseaseSchema);
