import FormField from "./FormField";

export default function AnimalRecordCard({
  animal,
  index,
  onUpdateAnimal
}) {
  return (
    <div className="sub-card">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-white/50">
            {animal.animalType} Record
          </p>
          <h3 className="mt-2 font-display text-2xl text-white">
            {animal.animalType} {index + 1}
          </h3>
        </div>
        <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-white/70">
          Live entry
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <FormField
          label="Name / Tag ID"
          value={animal.nameTagId}
          onChange={(event) => onUpdateAnimal(index, "nameTagId", event.target.value)}
          placeholder={`${animal.animalType}-10${index + 1}`}
        />
        <FormField
          label="Age"
          value={animal.age}
          onChange={(event) => onUpdateAnimal(index, "age", event.target.value)}
          placeholder="4 years 2 months"
        />
        <FormField
          label="Milk Yield (L/day)"
          type="number"
          value={animal.milkYieldPerDay}
          onChange={(event) =>
            onUpdateAnimal(index, "milkYieldPerDay", event.target.value)
          }
          placeholder="12"
        />
        <FormField
          label="Pregnancy Status"
          as="select"
          value={animal.pregnancyStatus}
          onChange={(event) =>
            onUpdateAnimal(index, "pregnancyStatus", event.target.value)
          }
        >
          <option className="text-ink">Pregnant</option>
          <option className="text-ink">Not Pregnant</option>
          <option className="text-ink">Unknown</option>
        </FormField>
      </div>
    </div>
  );
}
