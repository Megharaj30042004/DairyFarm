export default function StatTile({ label, value, accent = "text-white" }) {
  return (
    <div className="sub-card">
      <p className="text-xs uppercase tracking-[0.24em] text-white/50">{label}</p>
      <p className={`mt-3 text-3xl font-bold ${accent}`}>{value}</p>
    </div>
  );
}
