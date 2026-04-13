import { useState } from "react";
import { marketplaceDefault } from "../data/mockData";

export default function MarketplaceForm() {
  const [form, setForm] = useState(marketplaceDefault);

  const updateField = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value
    }));
  };

  return (
    <section className="section-shell">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.35em] text-ambermilk">
          Module 04
        </p>
        <h2 className="font-display text-3xl text-white md:text-4xl">
          Livestock Marketplace
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="field-label">Animal Type</label>
          <select
            className="field"
            value={form.animalType}
            onChange={(event) => updateField("animalType", event.target.value)}
          >
            <option className="text-ink">Cow</option>
            <option className="text-ink">Buffalo</option>
          </select>
        </div>
        <div>
          <label className="field-label">Number of Teeth</label>
          <input
            className="field"
            type="number"
            value={form.teethCount}
            onChange={(event) => updateField("teethCount", event.target.value)}
            placeholder="8"
          />
        </div>
        <div>
          <label className="field-label">Exact Age (Years / Months)</label>
          <input
            className="field"
            value={form.age}
            onChange={(event) => updateField("age", event.target.value)}
            placeholder="3 years 6 months"
          />
        </div>
        <div>
          <label className="field-label">Asking Price (₹)</label>
          <input
            className="field"
            type="number"
            value={form.askingPrice}
            onChange={(event) => updateField("askingPrice", event.target.value)}
            placeholder="85000"
          />
        </div>
        <div className="md:col-span-2">
          <label className="field-label">Seller's Mobile Number</label>
          <input
            className="field"
            type="tel"
            value={form.mobileNumber}
            onChange={(event) => updateField("mobileNumber", event.target.value)}
            placeholder="9876543210"
          />
        </div>
        <div className="md:col-span-2">
          <label className="field-label">Additional Details / Description</label>
          <textarea
            className="field min-h-32 resize-none"
            value={form.description}
            onChange={(event) => updateField("description", event.target.value)}
            placeholder="Share breeding details, lactation history, temperament, vaccination status, and transport availability."
          />
        </div>
      </div>

      <button className="primary-button mt-6">List Animal for Sale</button>
    </section>
  );
}
