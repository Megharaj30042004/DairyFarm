import FormField from "./FormField";
import { Sparkles, Milk, Tag } from "lucide-react";

export default function AnimalRecordCard({
  animal,
  index,
  onUpdateAnimal
}) {
  const isPregnant = animal.pregnancyStatus === "Pregnant";

  return (
    <div className="sub-card hover:border-emerald-500/30 transition-all duration-300">
      <div className="mb-4 sm:mb-5 flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ambermilk/20 text-ambermilk border border-ambermilk/30 font-bold">
            #{index + 1}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-emerald-400">
                {animal.animalType} Profile
              </span>
              {animal.nameTagId && (
                <span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/[0.06] px-2.5 py-0.5 text-[11px] font-bold text-slate-300">
                  <Tag className="h-3 w-3 text-ambermilk" />
                  {animal.nameTagId}
                </span>
              )}
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
              {animal.nameTagId ? animal.nameTagId : `${animal.animalType} #${index + 1}`}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className={`rounded-full px-3 py-1 text-xs font-extrabold tracking-wide border ${
            isPregnant 
              ? "bg-ambermilk/20 text-ambermilk border-ambermilk/30 shadow-amber-glow" 
              : "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
          }`}>
            {animal.pregnancyStatus || "Active"}
          </span>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
        <FormField
          label="Name / Tag ID"
          value={animal.nameTagId}
          onChange={(event) => onUpdateAnimal(index, "nameTagId", event.target.value)}
          placeholder={`${animal.animalType}-10${index + 1}`}
        />
        <FormField
          label="Age Profile"
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
          <option className="text-slate-950 bg-slate-900">Pregnant</option>
          <option className="text-slate-950 bg-slate-900">Not Pregnant</option>
          <option className="text-slate-950 bg-slate-900">Unknown</option>
        </FormField>
      </div>
    </div>
  );
}

