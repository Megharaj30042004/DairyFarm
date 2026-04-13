export const authPreview = {
  login: {
    email: "owner@dairyfarm.app",
    password: "••••••••"
  }
};

export function createAnimalDraft(animalType, index) {
  return {
    id: `${animalType.toLowerCase()}-${index + 1}`,
    animalType,
    nameTagId: "",
    age: "",
    milkYieldPerDay: "",
    pregnancyStatus: "Not Pregnant"
  };
}

export const cowInventorySeed = Array.from({ length: 5 }, (_, index) =>
  createAnimalDraft("Cow", index)
);

export const buffaloInventorySeed = Array.from({ length: 5 }, (_, index) =>
  createAnimalDraft("Buffalo", index)
);

export const herdSetupDefaults = {
  cowsCount: 0,
  buffaloesCount: 0
};

export const financialDefaults = {
  milkToDairyLiters: 950,
  milkToHouseholdsLiters: 460,
  cattleFeedExpense: 18000,
  veterinaryExpense: 4200,
  rates: {
    dairy: 38,
    households: 45
  }
};

export const emergencyContacts = [
  {
    id: 1,
    title: "Shivamogga District Veterinary Ambulance",
    phone: "1964",
    note: "Fast district-level livestock emergency support."
  },
  {
    id: 2,
    title: "Karnataka State Pashu Sanjeevini",
    phone: "1962",
    note: "State veterinary ambulance for urgent animal care."
  }
];

export const districtVeterinaryContacts = [
  "Bagalkote",
  "Ballari",
  "Belagavi",
  "Bengaluru Rural",
  "Bengaluru Urban",
  "Bidar",
  "Chamarajanagar",
  "Chikkaballapur",
  "Chikkamagaluru",
  "Chitradurga",
  "Dakshina Kannada",
  "Davanagere",
  "Dharwad",
  "Gadag",
  "Hassan",
  "Haveri",
  "Kalaburagi",
  "Kodagu",
  "Kolar",
  "Koppal",
  "Mandya",
  "Mysuru",
  "Raichur",
  "Ramanagara",
  "Shivamogga",
  "Tumakuru",
  "Udupi",
  "Uttara Kannada",
  "Vijayapura",
  "Yadgir"
].map((district, index) => ({
  id: index + 1,
  district,
  ambulance: "1962",
  backupHelpline: "8277100200",
  note: "State mobile veterinary ambulance and AH&VS helpline serving this district."
}));

export const marketplaceDefault = {
  animalType: "Cow",
  teethCount: "",
  age: "",
  askingPrice: "",
  mobileNumber: "",
  imageUrl: "",
  description: ""
};

export const diseaseGuide = [
  {
    id: "fmd",
    name: "ಬಾಯಿ-ಕಾಲು ರೋಗ (Foot and Mouth Disease)",
    symptoms:
      "Fever, drooling, mouth blisters, hoof sores, reduced appetite, and sudden drop in milk yield.",
    medicalIssues:
      "Painful lesions can lead to dehydration, lameness, severe weakness, and rapid weight loss.",
    recovery:
      "Isolate infected animals, disinfect sheds, provide soft feed and clean water, and call a veterinarian for supportive treatment and vaccination advice."
  },
  {
    id: "mastitis",
    name: "ಉಬ್ಬರ ಹಾಲುಗಡ್ಡೆ ಉರಿಯೂತ (Mastitis)",
    symptoms:
      "Swollen udder, heat or pain in the udder, clots in milk, and lower milk output.",
    medicalIssues:
      "Udder tissue inflammation can cause bacterial infection, poor milk quality, and long-term production loss.",
    recovery:
      "Maintain milking hygiene, discard infected milk, use vet-prescribed antibiotics when needed, and keep bedding dry and clean."
  },
  {
    id: "lsd",
    name: "ಗುಳ್ಳೆ ಚರ್ಮ ರೋಗ (Lumpy Skin Disease)",
    symptoms:
      "Fever, skin nodules, discharge from eyes and nose, limb swelling, and weakness.",
    medicalIssues:
      "Lesions and swelling can cause secondary infections, reproductive stress, and poor body condition.",
    recovery:
      "Separate sick animals, control flies and mosquitoes, clean wounds, provide anti-inflammatory care via veterinarian guidance, and vaccinate the herd preventively."
  },
  {
    id: "hs",
    name: "ಗಲಘೋಟು / ರಕ್ತಸ್ರಾವಿ ಸೆಪ್ಟಿಸೀಮಿಯಾ (Haemorrhagic Septicaemia)",
    symptoms:
      "High fever, throat swelling, breathing difficulty, dullness, and sudden weakness especially during monsoon.",
    medicalIssues:
      "Fast bacterial spread can lead to pneumonia, shock, and sudden death if treatment is delayed.",
    recovery:
      "Get immediate veterinary attention, start antibiotics only under prescription, keep the animal hydrated, and vaccinate before rainy season."
  },
  {
    id: "bq",
    name: "ಕಪ್ಪು ಕಾಲು ರೋಗ (Black Quarter)",
    symptoms:
      "Sudden fever, painful swelling in heavy muscles, crackling sound in the limb, limping, and fast collapse.",
    medicalIssues:
      "Toxin release damages muscles rapidly and can become fatal within a short time.",
    recovery:
      "Urgent veterinary treatment is required, isolate the animal, safely dispose of carcasses, disinfect the area, and vaccinate the herd on schedule."
  }
];
