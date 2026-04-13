import FarmProfile from "../models/FarmProfile.js";

export async function getFarmProfile(request, response) {
  try {
    const profile =
      (await FarmProfile.findOne({ owner: request.user.id })) ||
      (await FarmProfile.create({ owner: request.user.id }));

    return response.json(profile);
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
}

export async function upsertFarmProfile(request, response) {
  try {
    const { cowsCount = 0, buffaloesCount = 0 } = request.body;

    const profile = await FarmProfile.findOneAndUpdate(
      { owner: request.user.id },
      { cowsCount, buffaloesCount, owner: request.user.id },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    return response.json(profile);
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
}
