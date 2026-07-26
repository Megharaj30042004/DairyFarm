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
    name: "ಬಾಯಿ-ಕಾಲು ರೋಗ (Foot and Mouth Disease - FMD)",
    category: "Viral",
    imageUrl: "/images/diseases/fmd.jpg",
    symptoms:
      "High fever, continuous saliva drooling, painful mouth blisters, hoof sores, reduced appetite, and sudden drop in milk yield.",
    medicalIssues:
      "Painful lesions lead to severe dehydration, lameness, weight loss, secondary bacterial infections, and long-term lactation loss.",
    recovery:
      "Isolate infected cattle immediately. Wash mouth lesions with mild alum/potassium permanganate solution, apply zinc ointment to hoof sores, provide soft green fodder, and vaccinate all healthy animals twice annually."
  },
  {
    id: "mastitis",
    name: "ಕೆಚ್ಚಲು ಬಾವು / ಹಾಲುಗಡ್ಡೆ ಉರಿಯೂತ (Mastitis)",
    category: "Bacterial",
    imageUrl: "/images/diseases/mastitis.jpg",
    symptoms:
      "Swollen, hot, or hard udder quarters, severe pain during milking, yellowish/clotted/bloody milk, fever, and refusal to be milked.",
    medicalIssues:
      "Udder tissue damage leads to bacterial infection, permanent loss of quarter milk production, septicaemia, and poor milk quality.",
    recovery:
      "Maintain strict milking hygiene. Clean teats before and after milking. Discard infected milk safely, strip out affected quarters frequently, apply cold compresses, and administer vet-prescribed intramammary antibiotics."
  },
  {
    id: "lsd",
    name: "ಗುಳ್ಳೆ ಚರ್ಮ ರೋಗ (Lumpy Skin Disease - LSD)",
    category: "Viral",
    imageUrl: "/images/diseases/lsd.jpg",
    symptoms:
      "Fever, firm cutaneous skin nodules (2-5cm), nasal & eye discharge, swelling of legs and brisket, reduced milk yield, and lethargy.",
    medicalIssues:
      "Skin lesions can form deep ulcers, attract flies causing maggot wounds, cause pneumonia, lameness, and severe weakness.",
    recovery:
      "Separate sick animals. Spray fly repellents and disinfect sheds. Clean skin wounds with antiseptic. Give nutritious feed and electrolytes, and vaccinate uninfected herd members with Goat Pox / LSD vaccine."
  },
  {
    id: "hs",
    name: "ಗಲಘೋಟು / ರಕ್ತಸ್ರಾವಿ ಸೆಪ್ಟಿಸೀಮಿಯಾ (Haemorrhagic Septicaemia - HS)",
    category: "Bacterial",
    imageUrl: "/images/diseases/hs.jpg",
    symptoms:
      "High fever (104-106°F), severe painful swelling of throat, neck, and brisket, heavy breathing with grunting sounds, and dullness.",
    medicalIssues:
      "Rapid bacterial toxin release causes asphyxiation, pulmonary edema, septic shock, and sudden death within 12-24 hours if untreated.",
    recovery:
      "Call a veterinarian immediately for emergency IV antibiotics and anti-inflammatories. Keep cattle in dry, sheltered areas during monsoon and vaccinate annually prior to rainy season."
  },
  {
    id: "bq",
    name: "ಕಪ್ಪು ಕಾಲು ರೋಗ (Black Quarter - BQ)",
    category: "Bacterial",
    imageUrl: "/images/diseases/bq.jpg",
    symptoms:
      "Sudden high fever, severe lameness, crackling (crepitant) swelling in heavy hindquarter or shoulder muscles, and rapid collapse.",
    medicalIssues:
      "Clostridial muscle necrosis generates gas and lethal toxins that destroy tissue and cause fatality within 1-2 days.",
    recovery:
      "Urgent emergency antibiotic therapy by a veterinarian. Isolate affected animals, safely burn or deeply bury carcasses with lime, disinfect sheds, and administer annual BQ vaccination."
  },
  {
    id: "milkfever",
    name: "ಹಾಲಿನ ಜ್ವರ (Milk Fever / Hypocalcemia)",
    category: "Metabolic",
    imageUrl: "/images/diseases/milkfever.jpg",
    symptoms:
      "Restlessness followed by inability to stand, head turned back towards flank ('S' curve posture), cold ears, muscle tremors, and weak pulse soon after calving.",
    medicalIssues:
      "Severe drop in blood calcium level causes muscle paralysis, bloat, respiratory distress, and coma if calcium is not restored.",
    recovery:
      "Immediate slow intravenous infusion of Calcium Borogluconate under veterinary supervision. Keep cow propped upright, warm with blankets, and feed oral calcium gels post-calving."
  },
  {
    id: "brucellosis",
    name: "ಚೌಕಟ್ಟು ರೋಗ / ಸಾಂಕ್ರಾಮಿಕ ಗರ್ಭಪಾತ (Brucellosis)",
    category: "Bacterial",
    imageUrl: "/images/diseases/brucellosis.jpg",
    symptoms:
      "Late-stage abortion (after 5th month of pregnancy), retained placenta, uterine infection, vaginal discharge, and reduced fertility.",
    medicalIssues:
      "Chronic bacterial infection causes herd infertility and is zoonotic (can transmit to humans via raw milk).",
    recovery:
      "Safely dispose of aborted fetus and placenta with lime. Disinfect calving area thoroughly. Test herd regularly and vaccinate female calves aged 4-8 months with Brucella Cotton Strain 19 vaccine."
  }
];



