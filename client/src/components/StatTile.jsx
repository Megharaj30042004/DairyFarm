export default function StatTile({ label, value, accent = "text-white" }) {
  return (
    <div className="sub-card p-4 sm:p-6 border-sky-400/25 hover:border-sky-300/50 hover:shadow-sky-glow transition-all duration-300 group">
      <div className="flex items-center justify-between">
        <p className="text-[10px] sm:text-xs font-extrabold uppercase tracking-[0.2em] text-slate-300 group-hover:text-sky-300 transition-colors truncate">
          {label}
        </p>
        <span className="h-1.5 w-1.5 rounded-full bg-sky-300 opacity-70 group-hover:opacity-100 group-hover:scale-125 transition-all" />
      </div>
      <p className={`mt-2 sm:mt-3 text-xl sm:text-3xl md:text-4xl font-extrabold tracking-tight truncate ${accent}`}>
        {value}
      </p>
    </div>
  );
}

