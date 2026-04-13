import {
  BuffaloSchema,
  CowSchema,
  DiseaseGuideSchema,
  EmergencyContactSchema,
  FinancialRecordSchema,
  MarketplaceListingSchema
} from "./mockModels.js";

export const mockDatabase = {
  cows: [CowSchema],
  buffaloes: [BuffaloSchema],
  financialRecords: [FinancialRecordSchema],
  diseaseDirectory: [
    DiseaseGuideSchema,
    {
      _id: "disease_mastitis",
      name: "Mastitis",
      symptoms: ["Udder swelling", "Pain", "Clotted milk", "Lower output"],
      medicalIssues: ["Udder inflammation", "Milk quality reduction"],
      treatmentsAndPrevention: [
        "Use hygienic milking practice",
        "Consult vet for antibiotics",
        "Keep bedding dry"
      ]
    },
    {
      _id: "disease_lsd",
      name: "Lumpy Skin Disease",
      symptoms: ["Fever", "Skin nodules", "Weakness", "Nasal discharge"],
      medicalIssues: ["Secondary infections", "Reproductive stress"],
      treatmentsAndPrevention: [
        "Separate sick animals",
        "Control biting insects",
        "Clean lesions and vaccinate preventively"
      ]
    }
  ],
  marketplaceListings: [MarketplaceListingSchema],
  emergencyContacts: [
    EmergencyContactSchema,
    {
      _id: "emergency_002",
      district: "Karnataka",
      helplineName: "Pashu Sanjeevini Veterinary Ambulance",
      phone: "1962",
      priority: "high"
    }
  ]
};
