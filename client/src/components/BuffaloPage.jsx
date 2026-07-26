import { useState } from "react";
import AnimalRecordCard from "./AnimalRecordCard";
import PageIntro from "./PageIntro";

export default function BuffaloPage({
  buffaloes,
  herdSetup,
  onUpdateAnimal,
  onSave
}) {
  const [status, setStatus] = useState("");

  const handleSave = async () => {
    setStatus("");
    const plannedCount = Number(herdSetup.buffaloesCount || 0);
    if (plannedCount === 0) {
      const msg = "Validation Failed: No buffaloes planned in Herd Setup. Please configure setup first.";
      setStatus(msg);
      throw new Error(msg);
    }

    const activeBuffaloes = buffaloes.slice(0, plannedCount);
    for (let i = 0; i < activeBuffaloes.length; i++) {
      const animal = activeBuffaloes[i];
      if (!animal.nameTagId || !animal.nameTagId.trim()) {
        const msg = `Validation Failed: Please enter Name/Tag ID for Buffalo ${i + 1}.`;
        setStatus(msg);
        throw new Error(msg);
      }
      if (animal.milkYieldPerDay === "" || isNaN(Number(animal.milkYieldPerDay)) || Number(animal.milkYieldPerDay) < 0) {
        const msg = `Validation Failed: Please enter a valid Milk Yield (L/day) for Buffalo ${i + 1}.`;
        setStatus(msg);
        throw new Error(msg);
      }
    }

    try {
      await onSave();
      setStatus("Buffalo records saved successfully.");
    } catch (error) {
      setStatus(error.message || "Failed to save buffalo records.");
      throw error;
    }
  };


  return (
    <div>
      <PageIntro
        eyebrow="Page 03"
        title="Buffalo records"
        copy={`Maintain up to five buffalo entries separately for cleaner herd tracking. Planned buffaloes: ${Number(
          herdSetup.buffaloesCount || 0
        )}.`}
        actions={<button className="primary-button" onClick={handleSave}>Save Buffalo Records</button>}
      />

      {status ? <p className="mb-5 text-sm text-white/65">{status}</p> : null}

      <div className="grid gap-5">
        {buffaloes.map((animal, index) => (
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
