import { useState } from "react";
import AnimalRecordCard from "./AnimalRecordCard";
import PageIntro from "./PageIntro";

export default function CowsPage({ cows, herdSetup, onUpdateAnimal, onSave }) {
  const [status, setStatus] = useState("");

  const handleSave = async () => {
    setStatus("");
    const plannedCount = Number(herdSetup.cowsCount || 0);
    if (plannedCount === 0) {
      const msg = "Validation Failed: No cows planned in Herd Setup. Please configure setup first.";
      setStatus(msg);
      throw new Error(msg);
    }

    const activeCows = cows.slice(0, plannedCount);
    for (let i = 0; i < activeCows.length; i++) {
      const animal = activeCows[i];
      if (!animal.nameTagId || !animal.nameTagId.trim()) {
        const msg = `Validation Failed: Please enter Name/Tag ID for Cow ${i + 1}.`;
        setStatus(msg);
        throw new Error(msg);
      }
      if (animal.milkYieldPerDay === "" || isNaN(Number(animal.milkYieldPerDay)) || Number(animal.milkYieldPerDay) < 0) {
        const msg = `Validation Failed: Please enter a valid Milk Yield (L/day) for Cow ${i + 1}.`;
        setStatus(msg);
        throw new Error(msg);
      }
    }

    try {
      await onSave();
      setStatus("Cow records saved successfully.");
    } catch (error) {
      setStatus(error.message || "Failed to save cow records.");
      throw error;
    }
  };


  return (
    <div>
      <PageIntro
        eyebrow="Page 02"
        title="Cow records"
        copy={`Maintain up to five detailed cow entries here. Planned cows: ${Number(
          herdSetup.cowsCount || 0
        )}.`}
        actions={<button className="primary-button" onClick={handleSave}>Save Cow Records</button>}
      />

      {status ? <p className="mb-5 text-sm text-white/65">{status}</p> : null}

      <div className="grid gap-5">
        {cows.map((animal, index) => (
          <AnimalRecordCard
            key={animal.id}
            animal={animal}
            index={index}
            onUpdateAnimal={onUpdateAnimal}
          />
        ))}
      </div>
    </div>
  );
}
