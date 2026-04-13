import mongoose from "mongoose";

const cowSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    nameTagId: {
      type: String,
      required: true,
      trim: true
    },
    age: {
      years: { type: Number, default: 0 },
      months: { type: Number, default: 0 }
    },
    milkYieldPerDay: {
      type: Number,
      default: 0
    },
    pregnancyStatus: {
      type: String,
      enum: ["Pregnant", "Not Pregnant", "Unknown"],
      default: "Unknown"
    }
  },
  {
    timestamps: true,
    collection: "cows"
  }
);

export default mongoose.models.Cow || mongoose.model("Cow", cowSchema);
