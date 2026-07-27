import { Activity, AlertTriangle, HeartPulse, Search, X, PhoneCall, ShieldAlert, BookOpen } from "lucide-react";
import { useState, useEffect } from "react";
import PageIntro from "./PageIntro";
import { diseaseGuide } from "../data/mockData";

const diseaseImageMap = {
  fmd: "/images/diseases/fmd.jpg",
  mastitis: "/images/diseases/mastitis.jpg",
  lsd: "/images/diseases/lsd.jpg",
  hs: "/images/diseases/hs.jpg",
  bq: "/images/diseases/bq.jpg",
  milkfever: "/images/diseases/milkfever.jpg",
  brucellosis: "/images/diseases/brucellosis.jpg",
  theileriosis: "/images/diseases/hs.jpg",
  protozoan: "/images/diseases/bq.jpg",
  roundworms: "/images/diseases/lsd.jpg",
  hookworms: "/images/diseases/fmd.jpg",
  tapeworms: "/images/diseases/mastitis.jpg",
  fascioliasis: "/images/diseases/milkfever.jpg"
};

function getDiseaseImage(disease) {
  if (disease.imageUrl) return disease.imageUrl;
  const nameLower = (disease.name || "").toLowerCase();
  if (nameLower.includes("fmd") || nameLower.includes("ಬಾಯಿ") || nameLower.includes("foot")) return "/images/diseases/fmd.jpg";
  if (nameLower.includes("mastitis") || nameLower.includes("ಕೆಚ್ಚಲು") || nameLower.includes("ಹಾಲುಗಡ್ಡೆ")) return "/images/diseases/mastitis.jpg";
  if (nameLower.includes("lumpy") || nameLower.includes("lsd") || nameLower.includes("ಗುಳ್ಳೆ")) return "/images/diseases/lsd.jpg";
  if (nameLower.includes("theileriosis") || nameLower.includes("ಥೈಲೇರಿಯಾಸಿಸ್")) return "/images/diseases/hs.jpg";
  if (nameLower.includes("protozoan") || nameLower.includes("ಪ್ರೊಟೊಜೋವನ್") || nameLower.includes("babesiosis")) return "/images/diseases/bq.jpg";
  if (nameLower.includes("roundworm") || nameLower.includes("ಉರುಳೆ")) return "/images/diseases/lsd.jpg";
  if (nameLower.includes("hookworm") || nameLower.includes("ಕೊಕ್ಕೆ")) return "/images/diseases/fmd.jpg";
  if (nameLower.includes("tapeworm") || nameLower.includes("ಪಟ್ಟಿ")) return "/images/diseases/mastitis.jpg";
  if (nameLower.includes("fascioliasis") || nameLower.includes("fluke") || nameLower.includes("ಲಿವರ್")) return "/images/diseases/milkfever.jpg";
  if (nameLower.includes("septicaemia") || nameLower.includes("hs") || nameLower.includes("ಗಲಘೋಟು")) return "/images/diseases/hs.jpg";
  if (nameLower.includes("black quarter") || nameLower.includes("bq") || nameLower.includes("ಕಪ್ಪು")) return "/images/diseases/bq.jpg";
  if (nameLower.includes("milk fever") || nameLower.includes("hypocalcemia") || nameLower.includes("ಹಾಲಿನ ಜ್ವರ")) return "/images/diseases/milkfever.jpg";
  if (nameLower.includes("brucellosis") || nameLower.includes("ಚೌಕಟ್ಟು") || nameLower.includes("ಗರ್ಭಪಾತ")) return "/images/diseases/brucellosis.jpg";
  return diseaseImageMap[disease.id] || "/images/diseases/fmd.jpg";
}

export default function DiseasesPage({ diseases = [] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDisease, setSelectedDisease] = useState(null);

  // Combine API diseases with comprehensive fallback list so all 13 are always rendered
  const effectiveDiseases = diseases.length >= diseaseGuide.length ? diseases : diseaseGuide;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedDisease(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredDiseases = effectiveDiseases.filter((disease) => {
    const query = searchTerm.toLowerCase().trim();
    return (
      !query ||
      disease.name?.toLowerCase().includes(query) ||
      disease.symptoms?.toLowerCase().includes(query) ||
      disease.medicalIssues?.toLowerCase().includes(query) ||
      disease.recovery?.toLowerCase().includes(query)
    );
  });

  return (
    <div>
      {/* Detailed Full Disease Info & Image Modal */}
      {selectedDisease && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5">
          <div
            className="fixed inset-0 bg-slate-950/85 backdrop-blur-xl transition-opacity"
            onClick={() => setSelectedDisease(null)}
          />
          <div className="relative z-10 w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-[2rem] border border-sky-400/35 bg-slate-900/95 p-5 sm:p-7 shadow-2xl backdrop-blur-2xl no-scrollbar">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-sky-400/25 pb-4 mb-5">
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white leading-snug">
                  {selectedDisease.name}
                </h2>
              </div>
              <button
                onClick={() => setSelectedDisease(null)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-white/80 hover:bg-white/20 transition active:scale-95"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Disease Image Banner */}
            <div className="relative overflow-hidden rounded-2xl border border-sky-400/30 mb-6 group">
              <img
                src={getDiseaseImage(selectedDisease)}
                alt={selectedDisease.name}
                className="h-64 sm:h-80 w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-slate-200">
                <span className="font-semibold bg-slate-950/80 px-3 py-1 rounded-xl border border-white/10 backdrop-blur-md">
                  High-Resolution Clinical Visual
                </span>
              </div>
            </div>

            {/* Detailed Content Sections */}
            <div className="space-y-5 text-sm leading-relaxed">
              {/* Symptoms */}
              <div className="rounded-2xl border border-sky-400/25 bg-slate-800/60 p-4 sm:p-5">
                <div className="mb-2 flex items-center gap-2 text-sky-300 font-extrabold uppercase tracking-wider text-xs">
                  <AlertTriangle className="h-4 w-4" />
                  <span>Symptoms & Clinical Manifestation</span>
                </div>
                <p className="text-slate-200 leading-relaxed sm:text-base">
                  {selectedDisease.symptoms}
                </p>
              </div>

              {/* Medical Complications */}
              <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 sm:p-5">
                <div className="mb-2 flex items-center gap-2 text-red-400 font-extrabold uppercase tracking-wider text-xs">
                  <HeartPulse className="h-4 w-4 text-red-400" />
                  <span>Medical Risks & Internal Impact</span>
                </div>
                <p className="text-slate-200 leading-relaxed sm:text-base">
                  {selectedDisease.medicalIssues}
                </p>
              </div>

              {/* Treatment & Recovery */}
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 sm:p-5">
                <div className="mb-2 flex items-center gap-2 text-emerald-400 font-extrabold uppercase tracking-wider text-xs">
                  <Activity className="h-4 w-4 text-emerald-400" />
                  <span>Treatment, Recovery & Prevention Steps</span>
                </div>
                <p className="text-slate-200 leading-relaxed sm:text-base">
                  {selectedDisease.recovery}
                </p>
              </div>
            </div>

            {/* Footer Emergency Call Speed-Dial */}
            <div className="mt-7 pt-5 border-t border-sky-400/25 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <ShieldAlert className="h-4 w-4 text-sky-300" />
                <span>Immediate vet response required for severe symptoms</span>
              </div>
              <a
                href="tel:1962"
                className="inline-flex min-h-[48px] w-full sm:w-auto items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-red-500 to-rose-600 px-6 py-3 text-sm font-extrabold text-white shadow-lg transition active:scale-95 hover:brightness-110"
              >
                <PhoneCall className="h-4 w-4" />
                <span>Call Vet Helpline 1962 / 1964</span>
              </a>
            </div>

          </div>
        </div>
      )}

      <PageIntro
        eyebrow="Page 07"
        title="Comprehensive Disease & Medical Guide"
        copy="Complete livestock medical directory with Kannada & English disease guides, clinical symptoms, internal medical complications, treatment procedures, and emergency response steps."
      />

      {/* Search Input Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search disease name or symptoms (e.g. fever, Theileriosis, worms, ಬಾಯಿ, ಊತ)..."
            className="field pl-10"
          />
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
                className="overflow-hidden rounded-[1.75rem] border border-sky-400/25 bg-slate-800/60 grid grid-cols-1 lg:grid-cols-12 gap-0 shadow-lg hover:border-sky-400/45 transition-all duration-300"
              >
                {/* Clinical Image Beside Card */}
                <div
                  className="relative lg:col-span-4 overflow-hidden min-h-[240px] lg:min-h-full cursor-pointer group"
                  onClick={() => setSelectedDisease(disease)}
                >
                  <img
                    src={cardImage}
                    alt={`${disease.name} cattle health illustration`}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
                  <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-xl bg-slate-950/85 px-3 py-1.5 text-xs font-bold text-sky-300 border border-sky-400/30 backdrop-blur-md transition group-hover:bg-sky-400 group-hover:text-slate-950">
                    <BookOpen className="h-3.5 w-3.5" />
                    <span>Expand Modal</span>
                  </div>
                </div>

                {/* Complete Disease Information Details (All Sections) */}
                <div className="p-5 sm:p-6 lg:col-span-8 flex flex-col justify-between">
                  <div>
                    <div className="border-b border-sky-400/20 pb-3 mb-4 flex items-center justify-between">
                      <h3
                        onClick={() => setSelectedDisease(disease)}
                        className="font-display text-xl sm:text-2xl text-white font-bold leading-snug cursor-pointer hover:text-sky-300 transition-colors"
                      >
                        {disease.name}
                      </h3>
                      <a
                        href="tel:1962"
                        className="hidden sm:inline-flex items-center gap-1.5 rounded-xl bg-red-500/20 border border-red-500/30 px-3 py-1.5 text-xs font-bold text-red-300 hover:bg-red-500/30 transition"
                      >
                        <PhoneCall className="h-3.5 w-3.5" />
                        <span>Vet 1962</span>
                      </a>
                    </div>

                    <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-slate-200">
                      {/* Symptoms & Attack Pattern Section */}
                      <div className="bg-slate-900/70 rounded-2xl p-4 border border-sky-400/20">
                        <div className="mb-1.5 flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-sky-300">
                          <AlertTriangle className="h-4 w-4" />
                          <span>Symptoms & Clinical Manifestation</span>
                        </div>
                        <p className="text-slate-200 leading-relaxed">
                          {disease.symptoms}
                        </p>
                      </div>

                      {/* Medical Complications Section */}
                      {disease.medicalIssues && (
                        <div className="bg-red-500/10 rounded-2xl p-4 border border-red-500/25">
                          <div className="mb-1.5 flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-red-400">
                            <HeartPulse className="h-4 w-4" />
                            <span>Medical Complications & Internal Risks</span>
                          </div>
                          <p className="text-slate-200 leading-relaxed">
                            {disease.medicalIssues}
                          </p>
                        </div>
                      )}

                      {/* Recovery & Prevention Steps Section */}
                      <div className="bg-emerald-500/10 rounded-2xl p-4 border border-emerald-500/25">
                        <div className="mb-1.5 flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-emerald-400">
                          <Activity className="h-4 w-4" />
                          <span>Treatment, Recovery & Prevention Steps</span>
                        </div>
                        <p className="text-slate-200 leading-relaxed">
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
          <div className="rounded-[1.5rem] border border-sky-400/20 bg-slate-800/60 p-8 text-center text-slate-300">
            No diseases found matching &quot;{searchTerm}&quot;.
          </div>
        )}
      </div>
    </div>
  );
}
