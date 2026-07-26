import { Camera, Edit3, Image as ImageIcon, Maximize2, Trash2, Upload, X } from "lucide-react";
import { useState } from "react";
import { marketplaceDefault } from "../data/mockData";
import ConfirmationModal from "./ConfirmationModal";
import FormField from "./FormField";
import PageIntro from "./PageIntro";

const placeholderImages = {
  Cow: "https://images.unsplash.com/photo-1546445317-29f4545f9d52?auto=format&fit=crop&w=1200&q=80",
  Buffalo: "https://images.unsplash.com/photo-1570042707221-c454e56598eb?auto=format&fit=crop&w=1200&q=80"
};

export default function MarketplaceHub({
  listings,
  user,
  onCreateListing,
  onUpdateListing,
  onDeleteListing
}) {
  const [form, setForm] = useState(marketplaceDefault);
  const [status, setStatus] = useState("");
  const [zoomedImage, setZoomedImage] = useState(null);
  const [editingListing, setEditingListing] = useState(null);
  const [editForm, setEditForm] = useState(null);
  const [deletingListingId, setDeletingListingId] = useState(null);

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const updateEditField = (field, value) => {
    setEditForm((current) => ({ ...current, [field]: value }));
  };

  const handleImageFileChange = (e, isEdit = false) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid photo (JPG, PNG, WEBP).");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size is too large! Please choose a photo under 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result;
      if (isEdit) {
        updateEditField("imageUrl", dataUrl);
      } else {
        updateField("imageUrl", dataUrl);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    setStatus("");
    const teeth = Number(form.teethCount);
    const price = Number(form.askingPrice);

    if (form.teethCount === "" || isNaN(teeth) || teeth < 0) {
      const msg = "Validation Failed: Please enter a valid number of teeth.";
      setStatus(msg);
      throw new Error(msg);
    }
    if (!form.age || !form.age.trim()) {
      const msg = "Validation Failed: Please enter exact age (e.g. 3 years 6 months).";
      setStatus(msg);
      throw new Error(msg);
    }
    if (form.askingPrice === "" || isNaN(price) || price <= 0) {
      const msg = "Validation Failed: Please enter a valid asking price greater than ₹0.";
      setStatus(msg);
      throw new Error(msg);
    }
    if (!form.mobileNumber || !form.mobileNumber.trim() || form.mobileNumber.trim().length < 10) {
      const msg = "Validation Failed: Please enter a valid 10-digit seller mobile number.";
      setStatus(msg);
      throw new Error(msg);
    }
    if (!form.description || !form.description.trim()) {
      const msg = "Validation Failed: Please enter additional details/description for the livestock.";
      setStatus(msg);
      throw new Error(msg);
    }

    try {
      await onCreateListing({
        ...form,
        sellerMobileNumber: form.mobileNumber,
        teethCount: teeth,
        askingPrice: price,
        exactAge: form.age,
        imageUrl: form.imageUrl || placeholderImages[form.animalType]
      });
      setStatus("Marketplace listing published successfully.");
      setForm(marketplaceDefault);
    } catch (error) {
      setStatus(error.message || "Failed to publish listing.");
      throw error;
    }
  };

  const startEditing = (listing) => {
    setEditingListing(listing);
    setEditForm({
      animalType: listing.animalType || "Cow",
      teethCount: listing.teethCount || 0,
      age: listing.exactAge || "",
      askingPrice: listing.askingPrice || 0,
      mobileNumber: listing.sellerMobileNumber || "",
      imageUrl: listing.imageUrl || "",
      description: listing.description || ""
    });
  };

  const handleSaveEdit = async () => {
    if (!editingListing || !onUpdateListing) return;
    try {
      await onUpdateListing(editingListing._id, {
        animalType: editForm.animalType,
        teethCount: Number(editForm.teethCount || 0),
        exactAge: editForm.age,
        askingPrice: Number(editForm.askingPrice || 0),
        sellerMobileNumber: editForm.mobileNumber,
        imageUrl: editForm.imageUrl || placeholderImages[editForm.animalType],
        description: editForm.description
      });
      setEditingListing(null);
      setEditForm(null);
    } catch (error) {
      alert(error.message);
    }
  };

  const confirmDelete = async () => {
    if (!deletingListingId || !onDeleteListing) return;
    try {
      await onDeleteListing(deletingListingId);
      setDeletingListingId(null);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      {/* Lightbox Image Zoom Modal */}
      {zoomedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
            onClick={() => setZoomedImage(null)}
          />
          <div className="relative z-10 max-w-4xl max-h-[90vh] overflow-hidden rounded-[1.5rem] border border-white/20 bg-slate-900/95 p-3 shadow-2xl backdrop-blur-2xl">
            <div className="mb-2 flex items-center justify-between px-3 pt-2">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-ambermilk">
                {zoomedImage.title}
              </span>
              <button
                onClick={() => setZoomedImage(null)}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white/80 hover:bg-white/20"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <img
              src={zoomedImage.url}
              alt={zoomedImage.title}
              className="max-h-[75vh] w-full rounded-xl object-contain"
            />
          </div>
        </div>
      )}

      {/* Delete Listing Confirmation Modal */}
      <ConfirmationModal
        isOpen={Boolean(deletingListingId)}
        title="Delete Marketplace Listing?"
        message="Are you sure you want to delete this listing? It will be removed from the public marketplace permanently."
        confirmLabel="Delete Listing"
        cancelLabel="Cancel"
        isDanger={true}
        onConfirm={confirmDelete}
        onCancel={() => setDeletingListingId(null)}
      />

      {/* Edit Listing Modal */}
      {editingListing && editForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
            onClick={() => setEditingListing(null)}
          />
          <div className="relative z-10 w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-[1.5rem] border border-white/20 bg-slate-900/95 p-6 shadow-2xl backdrop-blur-2xl">
            <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="font-display text-xl text-white font-semibold">
                Edit Your Marketplace Listing
              </h3>
              <button
                onClick={() => setEditingListing(null)}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white/70"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4">
              <FormField
                label="Animal Type"
                as="select"
                value={editForm.animalType}
                onChange={(e) => updateEditField("animalType", e.target.value)}
              >
                <option className="text-ink">Cow</option>
                <option className="text-ink">Buffalo</option>
              </FormField>
              <FormField
                label="Number of Teeth"
                type="number"
                value={editForm.teethCount}
                onChange={(e) => updateEditField("teethCount", e.target.value)}
              />
              <FormField
                label="Exact Age"
                value={editForm.age}
                onChange={(e) => updateEditField("age", e.target.value)}
              />
              <FormField
                label="Asking Price (₹)"
                type="number"
                value={editForm.askingPrice}
                onChange={(e) => updateEditField("askingPrice", e.target.value)}
              />
              <FormField
                label="Seller Mobile Number"
                type="tel"
                value={editForm.mobileNumber}
                onChange={(e) => updateEditField("mobileNumber", e.target.value)}
              />
              <div className="space-y-1">
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/80">
                  Animal Photo (Upload from Mobile / PC)
                </label>
                <div className="flex items-center gap-3">
                  <label className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-white/30 bg-white/5 p-3 text-xs text-white/80 transition hover:border-ambermilk hover:bg-white/10 active:scale-[0.99]">
                    <Upload className="h-4 w-4 text-ambermilk" />
                    <span className="font-semibold">
                      {editForm.imageUrl ? "Change Photo from Device" : "Upload Photo from Storage"}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageFileChange(e, true)}
                    />
                  </label>

                  {editForm.imageUrl ? (
                    <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-lg border border-white/20">
                      <img
                        src={editForm.imageUrl}
                        alt="Preview"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : null}
                </div>
              </div>
              <FormField
                label="Additional Details"
                as="textarea"
                value={editForm.description}
                onChange={(e) => updateEditField("description", e.target.value)}
                rows={3}
              />
            </div>

            <div className="mt-6 flex items-center justify-end gap-3 border-t border-white/10 pt-4">
              <button
                onClick={() => setEditingListing(null)}
                className="ghost-button min-h-[42px] px-4 py-2 text-xs sm:text-sm font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="primary-button min-h-[42px] px-5 py-2 text-xs sm:text-sm font-bold"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      <PageIntro
        eyebrow="Page 05"
        title="Livestock marketplace"
        copy="Post cows and buffaloes with photo, price, age, and seller contact so any buyer visiting the marketplace can view the listings clearly."
      />

      {status ? <p className="mb-4 text-xs sm:text-sm text-white/65">{status}</p> : null}

      <div className="sub-card grid gap-3.5 sm:gap-4 grid-cols-1 md:grid-cols-2">
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
        <div className="md:col-span-2 space-y-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-white/80">
            Animal Photo (Upload from Mobile / PC Storage)
          </label>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <label className="flex flex-1 w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border border-dashed border-white/30 bg-white/5 p-4 text-xs text-white/80 transition hover:border-ambermilk hover:bg-white/10 active:scale-[0.99]">
              <Upload className="h-4 w-4 text-ambermilk" />
              <span className="font-semibold">
                {form.imageUrl ? "Change Photo from Storage" : "Click to Select Photo from Mobile or PC"}
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageFileChange(e, false)}
              />
            </label>

            {form.imageUrl ? (
              <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-xl border border-white/20">
                <img
                  src={form.imageUrl}
                  alt="Selected Preview"
                  className="h-full w-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => updateField("imageUrl", "")}
                  className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/80 text-white hover:bg-red-600"
                  title="Remove image"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ) : null}
          </div>

          <div className="pt-1">
            <span className="text-[11px] text-white/40 block mb-1">Or paste photo Web URL below:</span>
            <input
              type="text"
              value={form.imageUrl}
              onChange={(e) => updateField("imageUrl", e.target.value)}
              placeholder="https://example.com/cow-photo.jpg"
              className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs text-white placeholder-white/40 focus:border-ambermilk focus:outline-none"
            />
          </div>
        </div>
        <FormField
          label="Additional Details"
          className="md:col-span-2"
          as="textarea"
          value={form.description}
          onChange={(event) => updateField("description", event.target.value)}
          placeholder="Lactation stage, vaccination status, behavior, transport details, and feeding pattern."
          rows={4}
        />
        <div className="md:col-span-2">
          <button className="primary-button w-full sm:w-auto" onClick={handleSubmit}>
            Publish Listing
          </button>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="font-display text-xl sm:text-2xl text-white">Public Seller Listings</h3>
        <div className="mt-4 grid gap-4 grid-cols-1 xl:grid-cols-2">
          {listings.map((listing) => {
            const currentUserId = String(user?.id || user?._id || "");
            const listingOwnerId = String(
              typeof listing.owner === "object"
                ? listing.owner?._id || listing.owner?.id || ""
                : listing.owner || ""
            );

            const isOwner = Boolean(
              currentUserId &&
                listingOwnerId &&
                currentUserId === listingOwnerId
            );

            const displayImage = listing.imageUrl || placeholderImages[listing.animalType] || placeholderImages.Cow;


            return (
              <div
                key={listing._id}
                className="overflow-hidden rounded-[1.25rem] sm:rounded-[1.75rem] border border-white/10 bg-white/5 flex flex-col justify-between"
              >
                <div>
                  <div className="relative group overflow-hidden">
                    <img
                      src={displayImage}
                      alt={`${listing.animalType} listing`}
                      className="h-44 sm:h-56 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {/* Image Zoom Trigger Overlay */}
                    <button
                      onClick={() => setZoomedImage({ url: displayImage, title: `${listing.animalType} - ₹${Number(listing.askingPrice || 0).toLocaleString("en-IN")}` })}
                      className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-xl bg-black/60 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md transition hover:bg-black/80 active:scale-95"
                    >
                      <Maximize2 className="h-3.5 w-3.5" />
                      <span>Zoom Image</span>
                    </button>
                  </div>

                  <div className="p-4 sm:p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[10px] sm:text-xs uppercase tracking-[0.24em] text-ambermilk font-semibold">
                          {listing.animalType}
                        </p>
                        <h4 className="mt-1 sm:mt-2 text-xl sm:text-2xl font-semibold text-white">
                          ₹{Number(listing.askingPrice || 0).toLocaleString("en-IN")}
                        </h4>
                      </div>
                      <a
                        href={`tel:${listing.sellerMobileNumber}`}
                        className="ghost-button shrink-0 min-h-[44px] px-3.5 py-2 text-xs sm:text-sm"
                      >
                        Call Seller
                      </a>
                    </div>
                    <div className="mt-4 grid gap-1.5 sm:gap-2 text-xs sm:text-sm text-white/70 grid-cols-1 sm:grid-cols-2">
                      <p>Age: {listing.exactAge || "Not specified"}</p>
                      <p>Teeth: {listing.teethCount || 0}</p>
                      <p>Mobile: {listing.sellerMobileNumber || "-"}</p>
                      <p>Posted by: {listing.sellerName || "Farm seller"}</p>
                    </div>
                    <p className="mt-3 text-xs sm:text-sm leading-5 sm:leading-6 text-white/60">
                      {listing.description || "No extra details provided."}
                    </p>
                  </div>
                </div>

                {/* Owner Only Controls */}
                {isOwner && (
                  <div className="flex items-center justify-end gap-2 border-t border-white/10 bg-white/5 px-4 py-3">
                    <button
                      onClick={() => startEditing(listing)}
                      className="inline-flex min-h-[38px] items-center gap-1.5 rounded-xl border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white transition hover:bg-white/20 active:scale-95"
                    >
                      <Edit3 className="h-3.5 w-3.5 text-ambermilk" />
                      Edit Listing
                    </button>
                    <button
                      onClick={() => setDeletingListingId(listing._id)}
                      className="inline-flex min-h-[38px] items-center gap-1.5 rounded-xl border border-alert/30 bg-alert/15 px-3.5 py-1.5 text-xs font-semibold text-alert transition hover:bg-alert/25 active:scale-95"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
