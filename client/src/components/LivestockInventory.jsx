import { useState } from "react";
import { livestockInventorySeed } from "../data/mockData";

export default function LivestockInventory() {
  const [animals, setAnimals] = useState(livestockInventorySeed);

  const updateAnimal = (index, field, value) => {
    setAnimals((current) =>
      current.map((animal, animalIndex) =>
        animalIndex === index ? { ...animal, [field]: value } : animal
      )
    );
  };

  return (
    <section id="dashboard" className="section-shell">
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-ambermilk">
            Module 01
          </p>
          <h2 className="font-display text-3xl text-white md:text-4xl">
            Livestock Inventory Session
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-6 text-white/65">
          Record up to five animals in one pass with milk yield and pregnancy tracking
          to keep daily herd visibility simple.
        </p>
      </div>

      <div className="grid gap-5">
        {animals.map((animal, index) => (
          <div
            key={animal.id}
            className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5"
          >
            <div className="mb-5 flex items-center justify-between">
              <h3 className="font-display text-xl text-white">
                Animal {index + 1}
              </h3>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/65">
                {animal.animalType}
              </span>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <div>
                <label className="field-label">Name / Tag ID</label>
                <input
                  className="field"
                  value={animal.nameTagId}
                  onChange={(event) =>
                    updateAnimal(index, "nameTagId", event.target.value)
                  }
                  placeholder="Cow-101"
                />
              </div>
              <div>
                <label className="field-label">Age</label>
                <input
                  className="field"
                  value={animal.age}
                  onChange={(event) => updateAnimal(index, "age", event.target.value)}
                  placeholder="4 years"
                />
              </div>
              <div>
                <label className="field-label">Milk Yield (L/day)</label>
                <input
                  className="field"
                  type="number"
                  value={animal.milkYieldPerDay}
                  onChange={(event) =>
                    updateAnimal(index, "milkYieldPerDay", event.target.value)
                  }
                  placeholder="14"
                />
              </div>
              <div>
                <label className="field-label">Pregnancy Status</label>
                <select
                  className="field"
                  value={animal.pregnancyStatus}
                  onChange={(event) =>
                    updateAnimal(index, "pregnancyStatus", event.target.value)
                  }
                >
                  <option className="text-ink">Pregnant</option>
                  <option className="text-ink">Not Pregnant</option>
                  <option className="text-ink">Unknown</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
