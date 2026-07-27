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
  },
  {
    id: "theileriosis",
    name: "ಥೈಲೇರಿಯಾಸಿಸ್ / ಜ್ವರ ರಕ್ತದ ಪರೋಪಜೀವಿ (Theileriosis)",
    category: "Protozoan",
    imageUrl: "/images/diseases/hs.jpg",
    symptoms:
      "Continuous high fever (104-106°F), severe swelling of prescapular lymph nodes, pale or yellowish eye membranes (anemia & jaundice), rapid emaciation, and drop in milk production.",
    medicalIssues:
      "Theileria protozoan parasite destroys red blood cells and white lymph cells, leading to acute blood loss, pulmonary edema, liver damage, and high calf mortality. Transmitted by Hyalomma tick bites.",
    recovery:
      "Administer Buparvaquone (5 mg/kg body weight) along with blood tonic injections under vet supervision. Control tick vectors using Cypermethrin / Amitraz sprays on cattle and shed crevices regularly."
  },
  {
    id: "protozoan",
    name: "ಪ್ರೊಟೊಜೋವನ್ ರಕ್ತದ ಪರಾವಲಂಬಿ / ಬ್ಯಾಬೆಸಿಯಾಸಿಸ್ (Protozoan / Babesiosis)",
    category: "Protozoan",
    imageUrl: "/images/diseases/bq.jpg",
    symptoms:
      "High fever, dark coffee-colored urine (Redwater / Hemoglobinuria), severe anemia, muscle shivering, constipation followed by foul diarrhea, and weakness.",
    medicalIssues:
      "Babesia blood parasites multiply inside red blood cells causing massive intravascular hemolysis, hemoglobinuria, kidney congestion, jaundice, and fatal collapse.",
    recovery:
      "Immediate veterinary administration of Diminazene Aceturate (Berenil) or Imidocarb Dipropionate. Provide supportive fluids, iron tonics, and eliminate tick vectors from pastures and animal housing."
  },
  {
    id: "roundworms",
    name: "ಉರುಳೆ ಹುಳುಗಳ ಸೋಂಕು (Roundworm Infection - Toxocariasis)",
    category: "Parasitic",
    imageUrl: "/images/diseases/lsd.jpg",
    symptoms:
      "Pot-bellied abdomen in calves, dull rough hair coat, persistent foul diarrhea or constipation, stunted growth, poor feed conversion, and weight loss.",
    medicalIssues:
      "Roundworms (Toxocara vitulorum) absorb essential nutrients from the small intestine, cause intestinal irritation, colic, blockages, and severe calf mortality.",
    recovery:
      "Deworm calves at 10-14 days of age using Albendazole or Fenbendazole syrup. Repeat deworming monthly up to 6 months of age. Keep calf pens clean, dry, and free of fecal buildup."
  },
  {
    id: "hookworms",
    name: "ಕೊಕ್ಕೆ ಹುಳುಗಳ ಸೋಂಕು (Hookworm Infection - Bunostomiasis)",
    category: "Parasitic",
    imageUrl: "/images/diseases/fmd.jpg",
    symptoms:
      "Severe anemia, pale gums and eyelid conjunctiva, soft fluid swelling under the jaw (Bottle Jaw), chronic weight loss, dark bloody diarrhea, and weakness.",
    medicalIssues:
      "Adult hookworms (Bunostomum phlebotomum) attach to intestinal walls and actively suck blood, causing severe iron-deficiency anemia, hypoproteinemia, and extreme weakness.",
    recovery:
      "Administer broad-spectrum anthelmintics such as Ivermectin injection, Levamisole, or Fenbendazole. Provide iron supplements and keep calf bedding clean, dry, and well-drained."
  },
  {
    id: "tapeworms",
    name: "ಪಟ್ಟಿ ಹುಳುಗಳ ಸೋಂಕು (Tapeworm Infection - Monieziosis)",
    category: "Parasitic",
    imageUrl: "/images/diseases/mastitis.jpg",
    symptoms:
      "White rice-grain-like segments visible in manure, abdominal bloating, digestive disturbances, variable appetite, dull coat, and poor weight gain in young stock.",
    medicalIssues:
      "Moniezia tapeworms grow up to several meters in the small intestine, competing for vital nutrients, causing gut irritation, digestive cramps, and stunting.",
    recovery:
      "Deworm with Niclosamide, Praziquantel, or Fenbendazole under vet guidance. Practice rotational grazing and control soil pasture mites (oribatid intermediate hosts)."
  },
  {
    id: "fascioliasis",
    name: "ಲಿವರ್ ಫ್ಲೂಕ್ / ಡಿಸ್ಟೋಮಿಯಾಸಿಸ್ (Fascioliasis / Liver Fluke)",
    category: "Parasitic",
    imageUrl: "/images/diseases/milkfever.jpg",
    symptoms:
      "Soft bottle-jaw swelling under the lower jaw (ಅಡಿಬಾವು), chronic weakness, progressive weight loss, yellowish eyes/gums (jaundice), diarrhea, and low milk production.",
    medicalIssues:
      "Fasciola hepatica flukes migrate through liver tissue causing severe liver fibrosis, bile duct obstruction, hypoproteinemia, anemia, and liver failure. Transmitted by freshwater Lymnaea snails.",
    recovery:
      "Treat affected animals with Oxyclozanide, Triclabendazole, or Nitroxynil flukicides. Keep cattle away from swampy/waterlogged pastures where snails breed, and treat water bodies with copper sulfate."
  }
];



