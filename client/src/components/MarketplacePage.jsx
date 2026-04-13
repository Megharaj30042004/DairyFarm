import { useState } from "react";
import { marketplaceDefault } from "../data/mockData";
import FormField from "./FormField";
import PageIntro from "./PageIntro";

export default function MarketplacePage({ listings, onCreateListing }) {
  const [form, setForm] = useState(marketplaceDefault);
  const [status, setStatus] = useState("");

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      await onCreateListing({
        ...form,
        teethCount: Number(form.teethCount || 0),
        askingPrice: Number(form.askingPrice || 0),
        exactAge: form.age
      });
      setStatus("Marketplace listing published.");
      setForm(marketplaceDefault);
    } catch (error) {
      setStatus(error.message);
    }
  };

  return (
    <div>
      <PageIntro
        eyebrow="Page 05"
        title="List an animal for sale"
        copy="Create a clean marketplace entry with age, teeth count, price, and contact details so buyers can review the animal clearly."
      />

      {status ? <p className="mb-5 text-sm text-white/65">{status}</p> : null}

      <div className="sub-card grid gap-4 md:grid-cols-2">
        <FormField
          label="Animal Type"
          as="select"
          value={form.animalType}
          onChange={(event) => updateField("animalType", event.target.value)}
        >
          <option className="text-ink">Cow</option>
          <option className="text-ink">Buffalo</option>
        </FormField>
        <FormField
          label="Number of Teeth"
          type="number"
          value={form.teethCount}
          onChange={(event) => updateField("teethCount", event.target.value)}
          placeholder="8"
        />
        <FormField
          label="Exact Age"
          value={form.age}
          onChange={(event) => updateField("age", event.target.value)}
          placeholder="3 years 6 months"
        />
        <FormField
          label="Asking Price (₹)"
          type="number"
          value={form.askingPrice}
          onChange={(event) => updateField("askingPrice", event.target.value)}
          placeholder="85000"
        />
        <FormField
          label="Seller Mobile Number"
          className="md:col-span-2"
          type="tel"
          value={form.mobileNumber}
          onChange={(event) => updateField("mobileNumber", event.target.value)}
          placeholder="9876543210"
        />
        <FormField
          label="Additional Details"
          className="md:col-span-2"
          as="textarea"
          value={form.description}
          onChange={(event) => updateField("description", event.target.value)}
          placeholder="Lactation stage, vaccination status, behavior, transport details, and feeding pattern."
          rows={5}
        />
        <div className="md:col-span-2">
          <button className="primary-button" onClick={handleSubmit}>
            Publish Listing
          </button>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="font-display text-2xl text-white">Recent Listings</h3>
        <div className="mt-4 grid gap-4 xl:grid-cols-2">
          {listings.map((listing) => (
            <div key={listing._id} className="sub-card">
              <p className="text-xs uppercase tracking-[0.24em] text-ambermilk">
                {listing.animalType}
              </p>
              <h4 className="mt-2 text-xl font-semibold text-white">
                ₹{Number(listing.askingPrice || 0).toLocaleString("en-IN")}
              </h4>
              <p className="mt-3 text-sm leading-6 text-white/70">
                Age: {listing.exactAge || "Not specified"}
              </p>
              <p className="text-sm leading-6 text-white/70">
                Teeth: {listing.teethCount || 0}
              </p>
              <p className="text-sm leading-6 text-white/70">
                Mobile: {listing.sellerMobileNumber || "-"}
              </p>
              <p className="mt-3 text-sm leading-6 text-white/60">
                {listing.description || "No extra details provided."}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
