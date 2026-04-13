import { useState } from "react";
import AnimalRecordCard from "./AnimalRecordCard";
import PageIntro from "./PageIntro";

export default function CowsPage({ cows, herdSetup, onUpdateAnimal, onSave }) {
  const [status, setStatus] = useState("");

  const handleSave = async () => {
    try {
      await onSave();
      setStatus("Cow records saved.");
    } catch (error) {
      setStatus(error.message);
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
