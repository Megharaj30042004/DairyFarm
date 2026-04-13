export const CowSchema = {
  _id: "cow_001",
  animalType: "Cow",
  nameTagId: "Cow-101",
  age: {
    years: 4,
    months: 2
  },
  milkYieldPerDay: 14,
  pregnancyStatus: false,
  createdAt: "2026-04-13T06:30:00.000Z"
};

export const BuffaloSchema = {
  _id: "buffalo_001",
  animalType: "Buffalo",
  nameTagId: "Buff-202",
  age: {
    years: 5,
    months: 1
  },
  milkYieldPerDay: 10,
  pregnancyStatus: true,
  createdAt: "2026-04-13T06:30:00.000Z"
};

export const FinancialRecordSchema = {
  _id: "finance_001",
  milkToDairyLiters: 950,
  milkToHouseholdsLiters: 460,
  rates: {
    dairyPerLiter: 38,
    householdsPerLiter: 45
  },
  expenses: {
    cattleFeedFood: 18000,
    veterinaryMedicine: 4200
  },
  computedSummary: {
    grossRevenue: 56800,
    totalExpenses: 22200,
    finalNetIncome: 34600
  }
};

export const DiseaseGuideSchema = {
  _id: "disease_fmd",
  name: "Foot and Mouth Disease",
  symptoms: [
    "Fever",
    "Drooling",
    "Mouth blisters",
    "Hoof sores",
    "Sudden fall in milk yield"
  ],
  medicalIssues: [
    "Painful eating",
    "Dehydration",
    "Lameness",
    "Weight loss"
  ],
  treatmentsAndPrevention: [
    "Isolate infected animals",
    "Disinfect shed and feeding surfaces",
    "Provide soft feed and water",
    "Follow veterinarian vaccination guidance"
  ]
};

export const MarketplaceListingSchema = {
  _id: "listing_001",
  animalType: "Buffalo",
  teethCount: 8,
  exactAge: "5 years 1 month",
  askingPrice: 95000,
  sellerMobileNumber: "9876543210",
  description: "Second lactation, calm temperament, vaccinated, good fat percentage."
};

export const EmergencyContactSchema = {
  _id: "emergency_001",
  district: "Shivamogga",
  helplineName: "District Veterinary Ambulance",
  phone: "1964",
  priority: "high"
};
