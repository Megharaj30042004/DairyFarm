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
    try {
      await onSave();
      setStatus("Buffalo records saved.");
    } catch (error) {
      setStatus(error.message);
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
