import Disease from "../models/Disease.js";
import EmergencyContact from "../models/EmergencyContact.js";
import { diseaseSeed, districtEmergencySeed, emergencyPrioritySeed } from "../utils/seedData.js";

export async function ensureContentSeeded() {
  const diseaseCount = await Disease.countDocuments();
  if (!diseaseCount) {
    await Disease.insertMany(diseaseSeed);
  }

  const emergencyCount = await EmergencyContact.countDocuments();
  if (!emergencyCount) {
    await EmergencyContact.insertMany([
      ...emergencyPrioritySeed,
      ...districtEmergencySeed
    ]);
  }
}

export async function getDiseases(_request, response) {
  try {
    const diseases = await Disease.find().sort({ createdAt: 1 });
    return response.json(diseases);
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
}

export async function getEmergencyContacts(_request, response) {
  try {
    const priority = await EmergencyContact.find({ priority: "high" }).sort({ createdAt: 1 });
    const districts = await EmergencyContact.find({ priority: { $ne: "high" } }).sort({
      district: 1
    });

    return response.json({
      priority,
      districts
    });
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
}
