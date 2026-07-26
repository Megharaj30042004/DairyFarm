export default function StatTile({ label, value, accent = "text-white" }) {
  return (
    <div className="sub-card p-3 sm:p-5">
      <p className="text-[10px] sm:text-xs uppercase tracking-[0.18em] sm:tracking-[0.24em] text-white/50 truncate">
        {label}
      </p>
      <p className={`mt-1.5 sm:mt-3 text-lg sm:text-2xl md:text-3xl font-bold truncate ${accent}`}>
        {value}
      </p>
    </div>
  );
}

