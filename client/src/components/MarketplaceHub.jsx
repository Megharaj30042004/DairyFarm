import { useState } from "react";
import { marketplaceDefault } from "../data/mockData";
import FormField from "./FormField";
import PageIntro from "./PageIntro";

const placeholderImages = {
  Cow: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=1200&q=80",
  Buffalo:
    "https://images.unsplash.com/photo-1596733430284-f7437764b1a9?auto=format&fit=crop&w=1200&q=80"
};

export default function MarketplaceHub({ listings, onCreateListing }) {
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
        exactAge: form.age,
        imageUrl: form.imageUrl || placeholderImages[form.animalType]
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
        title="Livestock marketplace"
        copy="Post cows and buffaloes with photo, price, age, and seller contact so any buyer visiting the marketplace can view the listings clearly."
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
          label="Animal Image URL"
          className="md:col-span-2"
          value={form.imageUrl}
          onChange={(event) => updateField("imageUrl", event.target.value)}
          placeholder="https://example.com/cow-photo.jpg"
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
        <h3 className="font-display text-2xl text-white">Public Seller Listings</h3>
        <div className="mt-4 grid gap-4 xl:grid-cols-2">
          {listings.map((listing) => (
            <div
              key={listing._id}
              className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5"
            >
              <img
                src={listing.imageUrl || placeholderImages[listing.animalType]}
                alt={`${listing.animalType} listing`}
                className="h-56 w-full object-cover"
              />
              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-ambermilk">
                      {listing.animalType}
                    </p>
                    <h4 className="mt-2 text-2xl font-semibold text-white">
                      ₹{Number(listing.askingPrice || 0).toLocaleString("en-IN")}
                    </h4>
                  </div>
                  <a
                    href={`tel:${listing.sellerMobileNumber}`}
                    className="ghost-button px-4 py-2"
                  >
                    Call Seller
                  </a>
                </div>
                <div className="mt-4 grid gap-2 text-sm text-white/70 md:grid-cols-2">
                  <p>Age: {listing.exactAge || "Not specified"}</p>
                  <p>Teeth: {listing.teethCount || 0}</p>
                  <p>Mobile: {listing.sellerMobileNumber || "-"}</p>
                  <p>Posted by: {listing.sellerName || "Farm seller"}</p>
                </div>
                <p className="mt-4 text-sm leading-6 text-white/60">
                  {listing.description || "No extra details provided."}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
