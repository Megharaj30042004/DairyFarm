import { Activity, AlertTriangle, HeartPulse, Maximize2, Search, X } from "lucide-react";
import { useState } from "react";
import PageIntro from "./PageIntro";

const diseaseImageMap = {
  fmd: "/images/diseases/fmd.jpg",
  mastitis: "/images/diseases/mastitis.jpg",
  lsd: "/images/diseases/lsd.jpg",
  hs: "/images/diseases/hs.jpg",
  bq: "/images/diseases/bq.jpg",
  milkfever: "/images/diseases/milkfever.jpg",
  brucellosis: "/images/diseases/brucellosis.jpg"
};

function getDiseaseImage(disease) {
  if (disease.imageUrl) return disease.imageUrl;
  const nameLower = (disease.name || "").toLowerCase();
  if (nameLower.includes("fmd") || nameLower.includes("ಬಾಯಿ") || nameLower.includes("foot")) return "/images/diseases/fmd.jpg";
  if (nameLower.includes("mastitis") || nameLower.includes("ಕೆಚ್ಚಲು") || nameLower.includes("ಹಾಲುಗಡ್ಡೆ")) return "/images/diseases/mastitis.jpg";
  if (nameLower.includes("lumpy") || nameLower.includes("lsd") || nameLower.includes("ಗುಳ್ಳೆ")) return "/images/diseases/lsd.jpg";
  if (nameLower.includes("septicaemia") || nameLower.includes("hs") || nameLower.includes("ಗಲಘೋಟು")) return "/images/diseases/hs.jpg";
  if (nameLower.includes("black quarter") || nameLower.includes("bq") || nameLower.includes("ಕಪ್ಪು")) return "/images/diseases/bq.jpg";
  if (nameLower.includes("milk fever") || nameLower.includes("hypocalcemia") || nameLower.includes("ಹಾಲಿನ ಜ್ವರ")) return "/images/diseases/milkfever.jpg";
  if (nameLower.includes("brucellosis") || nameLower.includes("ಚೌಕಟ್ಟು") || nameLower.includes("ಗರ್ಭಪಾತ")) return "/images/diseases/brucellosis.jpg";
  return diseaseImageMap[disease.id] || "/images/diseases/fmd.jpg";
}

export default function DiseasesPage({ diseases = [] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [zoomedImage, setZoomedImage] = useState(null);

  const categories = ["All", "Viral", "Bacterial", "Metabolic"];

  const filteredDiseases = diseases.filter((disease) => {
    const matchesCategory =
      activeCategory === "All" || disease.category === activeCategory;

    const query = searchTerm.toLowerCase().trim();
    const matchesSearch =
      !query ||
      disease.name?.toLowerCase().includes(query) ||
      disease.category?.toLowerCase().includes(query) ||
      disease.symptoms?.toLowerCase().includes(query) ||
      disease.medicalIssues?.toLowerCase().includes(query) ||
      disease.recovery?.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });


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

      <PageIntro
        eyebrow="Page 07"
        title="Disease guide with Kannada names"
        copy="Detailed livestock medical guide with Kannada disease titles, viral/bacterial/metabolic categorization, symptoms, medical risks, and prevention steps."
      />

      {/* Search and Category Filter Bar */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search viral, bacterial, metabolic diseases or symptoms (e.g. fever, udder, ಬಾಯಿ)..."
            className="w-full rounded-xl border border-white/15 bg-white/5 py-2.5 pl-10 pr-4 text-xs sm:text-sm text-white placeholder-white/40 focus:border-ambermilk focus:outline-none focus:ring-1 focus:ring-ambermilk"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 rounded-xl px-3.5 py-2 text-xs font-semibold transition ${
                activeCategory === cat
                  ? "bg-ambermilk text-slate-950 shadow-md"
                  : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10"
              }`}
            >
              {cat} {cat !== "All" ? "Diseases" : ""}
            </button>
          ))}
        </div>
      </div>

      {/* Disease Cards Grid */}
      <div className="grid gap-6 grid-cols-1">
        {filteredDiseases.length > 0 ? (
          filteredDiseases.map((disease) => {
            const cardImage = getDiseaseImage(disease);


            return (
              <article
                key={disease._id || disease.id || disease.name}
                className="overflow-hidden rounded-[1.25rem] sm:rounded-[1.75rem] border border-white/10 bg-white/5 grid grid-cols-1 lg:grid-cols-12 gap-0"
              >
                {/* 100% Relevant Disease Image Beside Card */}
                <div className="relative lg:col-span-4 overflow-hidden group min-h-[220px] lg:min-h-full">
                  <img
                    src={cardImage}
                    alt={`${disease.name} cattle health illustration`}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <button
                    onClick={() =>
                      setZoomedImage({
                        url: cardImage,
                        title: `${disease.name} (${disease.category || "Disease"})`
                      })
                    }
                    className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-xl bg-black/60 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md transition hover:bg-black/80 active:scale-95"
                  >
                    <Maximize2 className="h-3.5 w-3.5" />
                    <span>Zoom Image</span>
                  </button>
                </div>

                {/* Disease Information Details */}
                <div className="p-5 sm:p-6 lg:col-span-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-3">
                      <div>
                        <span className="inline-block rounded-md bg-ambermilk/20 px-2.5 py-0.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-ambermilk border border-ambermilk/30 mb-2">
                          {disease.category || "General"} Disease
                        </span>
                        <h3 className="font-display text-xl sm:text-2xl text-white font-semibold leading-snug">
                          {disease.name}
                        </h3>
                      </div>
                    </div>

                    <div className="mt-4 space-y-4 text-xs sm:text-sm leading-6 text-white/75">
                      {/* Symptoms & Attack Pattern */}
                      <div>
                        <div className="mb-1 flex items-center gap-1.5 text-[10px] sm:text-xs uppercase tracking-[0.2em] text-ambermilk font-semibold">
                          <AlertTriangle className="h-3.5 w-3.5" />
                          <span>Symptoms & Attack Pattern</span>
                        </div>
                        <p className="bg-white/5 rounded-xl p-3 border border-white/5 text-white/90">
                          {disease.symptoms}
                        </p>
                      </div>

                      {/* Medical Complications */}
                      <div>
                        <div className="mb-1 flex items-center gap-1.5 text-[10px] sm:text-xs uppercase tracking-[0.2em] text-rose-400 font-semibold">
                          <HeartPulse className="h-3.5 w-3.5 text-rose-400" />
                          <span>Medical Complications</span>
                        </div>
                        <p className="bg-white/5 rounded-xl p-3 border border-white/5 text-white/90">
                          {disease.medicalIssues}
                        </p>
                      </div>

                      {/* Recovery & Prevention Steps */}
                      <div>
                        <div className="mb-1 flex items-center gap-1.5 text-[10px] sm:text-xs uppercase tracking-[0.2em] text-emerald-400 font-semibold">
                          <Activity className="h-3.5 w-3.5 text-emerald-400" />
                          <span>Recovery & Prevention Steps</span>
                        </div>
                        <p className="bg-white/5 rounded-xl p-3 border border-white/5 text-white/90">
                          {disease.recovery}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })
        ) : (
          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-8 text-center text-white/60">
            No diseases found matching &quot;{searchTerm}&quot;.
          </div>
        )}
      </div>
    </div>
  );
}
