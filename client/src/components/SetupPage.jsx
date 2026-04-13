import FormField from "./FormField";
import PageIntro from "./PageIntro";
import StatTile from "./StatTile";

import { useState } from "react";

export default function SetupPage({ herdSetup, setHerdSetup, stats, onSave }) {
  const [status, setStatus] = useState("");

  const updateField = (field, value) => {
    setHerdSetup((current) => ({
      ...current,
      [field]: value
    }));
  };

  const handleSave = async () => {
    try {
      await onSave();
      setStatus("Farm setup saved successfully.");
    } catch (error) {
      setStatus(error.message);
    }
  };

  return (
    <div>
      <PageIntro
        eyebrow="Page 01"
        title="Start with your herd size"
        copy="Enter the number of cows and buffaloes on your farm separately. This page becomes the clean starting point before you move into detailed animal records."
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <div className="sub-card space-y-4">
          <FormField
            label="Number of Cows"
            type="number"
            value={herdSetup.cowsCount}
            onChange={(event) => updateField("cowsCount", event.target.value)}
            placeholder="12"
          />
          <FormField
            label="Number of Buffaloes"
            type="number"
            value={herdSetup.buffaloesCount}
            onChange={(event) => updateField("buffaloesCount", event.target.value)}
            placeholder="6"
          />
          <p className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm leading-6 text-white/70">
            After this, open the separate Cows and Buffaloes pages from the left
            menu to enter detailed records.
          </p>
          <button className="primary-button" onClick={handleSave}>
            Save Herd Setup
          </button>
          {status ? <p className="text-sm text-white/65">{status}</p> : null}
        </div>

        <div className="grid gap-4">
          <StatTile label="Planned Cows" value={stats.cows} accent="text-ambermilk" />
          <StatTile
            label="Planned Buffaloes"
            value={stats.buffaloes}
            accent="text-meadow"
          />
          <StatTile
            label="Entered Daily Milk Capacity"
            value={`${stats.totalMilkCapacity} L`}
          />
        </div>
      </div>
    </div>
  );
}
