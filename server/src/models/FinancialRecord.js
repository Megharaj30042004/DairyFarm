import mongoose from "mongoose";

const financialRecordSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },
    milkToDairyLiters: {
      type: Number,
      default: 0
    },
    milkToHouseholdsLiters: {
      type: Number,
      default: 0
    },
    rates: {
      dairy: { type: Number, default: 38 },
      households: { type: Number, default: 45 }
    },
    cattleFeedExpense: {
      type: Number,
      default: 0
    },
    veterinaryExpense: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true,
    collection: "financial_records"
  }
);

export default mongoose.models.FinancialRecord ||
  mongoose.model("FinancialRecord", financialRecordSchema);
