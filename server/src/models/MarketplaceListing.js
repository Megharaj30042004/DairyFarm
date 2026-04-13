import mongoose from "mongoose";

const marketplaceListingSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    animalType: {
      type: String,
      enum: ["Cow", "Buffalo"],
      required: true
    },
    teethCount: Number,
    exactAge: String,
    askingPrice: Number,
    imageUrl: String,
    sellerName: String,
    sellerMobileNumber: String,
    description: String
  },
  {
    timestamps: true,
    collection: "marketplace_listings"
  }
);

export default mongoose.models.MarketplaceListing ||
  mongoose.model("MarketplaceListing", marketplaceListingSchema);
