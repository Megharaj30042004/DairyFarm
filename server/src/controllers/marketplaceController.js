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
      sellerName: request.body.sellerName || request.user.fullName || "Farm seller",
      owner: request.user.id
    });

    return response.status(201).json(listing);
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
}
