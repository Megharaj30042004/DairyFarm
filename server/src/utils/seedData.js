export const diseaseSeed = [
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



export const emergencyPrioritySeed = [
  {
    title: "Shivamogga District Veterinary Ambulance",
    district: "Shivamogga",
    phone: "08182-222164",
    backupHelpline: "1964",
    note: "Fast district-level livestock emergency veterinary hospital.",
    priority: "high"
  },
  {
    title: "Karnataka State Pashu Sanjeevini Helpline",
    district: "Karnataka",
    phone: "1962",
    backupHelpline: "080-22860846",
    note: "Statewide mobile veterinary ambulance dispatch service.",
    priority: "high"
  }
];

export const districtEmergencySeed = [
  { district: "Bagalkote", phone: "08354-220164", backupHelpline: "08354-220038", note: "Bagalkote District Veterinary Polyclinic & Hospital" },
  { district: "Ballari", phone: "08392-272445", backupHelpline: "08392-273111", note: "Ballari District Animal Husbandry Emergency Line" },
  { district: "Belagavi", phone: "0831-2407266", backupHelpline: "0831-2421360", note: "Belagavi District Veterinary Hospital & Ambulance" },
  { district: "Bengaluru Rural", phone: "080-22864619", backupHelpline: "080-22865544", note: "Bengaluru Rural Veterinary Services Helpline" },
  { district: "Bengaluru Urban", phone: "080-22860846", backupHelpline: "080-22863925", note: "Bengaluru Central Super Specialty Veterinary Hospital" },
  { district: "Bidar", phone: "08482-226245", backupHelpline: "08482-225301", note: "Bidar District Veterinary Polyclinic" },
  { district: "Chamarajanagar", phone: "08226-222415", backupHelpline: "08226-223120", note: "Chamarajanagar District Veterinary Emergency Center" },
  { district: "Chikkaballapur", phone: "08156-273155", backupHelpline: "08156-273200", note: "Chikkaballapur District Veterinary Hospital" },
  { district: "Chikkamagaluru", phone: "08262-230489", backupHelpline: "08262-235122", note: "Chikkamagaluru District Veterinary Emergency Office" },
  { district: "Chitradurga", phone: "08194-222830", backupHelpline: "08194-230145", note: "Chitradurga Veterinary Polyclinic & Ambulance" },
  { district: "Dakshina Kannada", phone: "0824-2423164", backupHelpline: "0824-2422360", note: "Mangaluru District Veterinary Hospital" },
  { district: "Davanagere", phone: "08192-250645", backupHelpline: "08192-231120", note: "Davanagere District Veterinary Emergency Line" },
  { district: "Dharwad", phone: "0836-2447466", backupHelpline: "0836-2444310", note: "Hubballi-Dharwad District Veterinary Hospital" },
  { district: "Gadag", phone: "08372-238245", backupHelpline: "08372-237120", note: "Gadag District Animal Husbandry Office" },
  { district: "Hassan", phone: "08172-268355", backupHelpline: "08172-265140", note: "Hassan District Veterinary Polyclinic & Hospital" },
  { district: "Haveri", phone: "08375-232415", backupHelpline: "08375-233100", note: "Haveri District Veterinary Emergency Dispatch" },
  { district: "Kalaburagi", phone: "08472-220466", backupHelpline: "08472-221310", note: "Kalaburagi District Veterinary Hospital" },
  { district: "Kodagu", phone: "08272-225489", backupHelpline: "08272-228120", note: "Madikeri Kodagu District Veterinary Polyclinic" },
  { district: "Kolar", phone: "08152-222155", backupHelpline: "08152-223400", note: "Kolar District Veterinary Hospital & Helpline" },
  { district: "Koppal", phone: "08539-230245", backupHelpline: "08539-231100", note: "Koppal District Animal Emergency Center" },
  { district: "Mandya", phone: "08232-220355", backupHelpline: "08232-224120", note: "Mandya District Veterinary Polyclinic" },
  { district: "Mysuru", phone: "0821-2443655", backupHelpline: "0821-2442310", note: "Mysuru District Super Specialty Veterinary Hospital" },
  { district: "Raichur", phone: "08532-235466", backupHelpline: "08532-238120", note: "Raichur District Animal Emergency Office" },
  { district: "Ramanagara", phone: "080-27271415", backupHelpline: "080-27272200", note: "Ramanagara District Veterinary Hospital" },
  { district: "Shivamogga", phone: "08182-222164", backupHelpline: "08182-227410", note: "Shivamogga District Veterinary Polyclinic & Hospital" },
  { district: "Tumakuru", phone: "0816-2278355", backupHelpline: "0816-2251200", note: "Tumakuru District Animal Emergency Services" },
  { district: "Udupi", phone: "0820-2520489", backupHelpline: "0820-2521360", note: "Udupi District Veterinary Polyclinic & Ambulance" },
  { district: "Uttara Kannada", phone: "08382-226345", backupHelpline: "08382-228120", note: "Karwar District Veterinary Emergency Hospital" },
  { district: "Vijayapura", phone: "08352-250466", backupHelpline: "08352-251310", note: "Vijayapura District Veterinary Emergency Center" },
  { district: "Yadgir", phone: "08473-250245", backupHelpline: "08473-251100", note: "Yadgir District Veterinary Hospital" }
].map((item) => ({
  title: `${item.district} Veterinary Hospital & Ambulance`,
  district: item.district,
  phone: item.phone,
  backupHelpline: item.backupHelpline,
  note: item.note,
  priority: "normal"
}));
