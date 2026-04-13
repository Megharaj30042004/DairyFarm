import mongoose from "mongoose";

const farmProfileSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },
    cowsCount: {
      type: Number,
      default: 0
    },
    buffaloesCount: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true,
    collection: "farm_profiles"
  }
);

export default mongoose.models.FarmProfile ||
  mongoose.model("FarmProfile", farmProfileSchema);
