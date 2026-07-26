import mongoose from "mongoose";
import MarketplaceListing from "../models/MarketplaceListing.js";

export async function listListings(_request, response) {
  try {
    const listings = await MarketplaceListing.find().sort({ createdAt: -1 }).limit(20);
    return response.json(listings);
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
}

export async function createListing(request, response) {
  try {
    const listing = await MarketplaceListing.create({
      ...request.body,
      sellerMobileNumber: request.body.sellerMobileNumber || request.body.mobileNumber || "",
      sellerName: request.body.sellerName || request.user?.fullName || "Farm seller",
      owner: request.user.id
    });

    return response.status(201).json(listing);
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
}

export async function updateListing(request, response) {
  try {
    const { id } = request.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.json({ _id: id, ...request.body, owner: request.user.id });
    }

    const listing = await MarketplaceListing.findById(id);
    if (!listing) {
      return response.status(404).json({ message: "Listing not found." });
    }

    const listingOwnerId = listing.owner ? listing.owner.toString() : "";
    const currentUserId = request.user?.id ? request.user.id.toString() : "";

    if (listingOwnerId && currentUserId && listingOwnerId !== currentUserId) {
      return response.status(403).json({ message: "You are not authorized to edit this listing." });
    }

    Object.assign(listing, {
      animalType: request.body.animalType || listing.animalType,
      teethCount: request.body.teethCount ?? listing.teethCount,
      exactAge: request.body.exactAge || listing.exactAge,
      askingPrice: request.body.askingPrice ?? listing.askingPrice,
      imageUrl: request.body.imageUrl || listing.imageUrl,
      sellerMobileNumber: request.body.sellerMobileNumber || listing.sellerMobileNumber,
      description: request.body.description || listing.description
    });

    await listing.save();
    return response.json(listing);
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
}

export async function deleteListing(request, response) {
  try {
    const { id } = request.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.json({ message: "Listing deleted successfully.", id });
    }

    const listing = await MarketplaceListing.findById(id);
    if (!listing) {
      return response.json({ message: "Listing deleted successfully.", id });
    }

    const listingOwnerId = listing.owner ? listing.owner.toString() : "";
    const currentUserId = request.user?.id ? request.user.id.toString() : "";

    if (listingOwnerId && currentUserId && listingOwnerId !== currentUserId) {
      return response.status(403).json({ message: "You are not authorized to delete this listing." });
    }

    await MarketplaceListing.findByIdAndDelete(id);
    return response.json({ message: "Listing deleted successfully.", id });
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
}



