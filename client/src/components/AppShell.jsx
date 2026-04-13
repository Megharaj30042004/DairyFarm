import { LogOut, Milk, ShieldPlus } from "lucide-react";
import StatTile from "./StatTile";

export default function AppShell({
  routes,
  activeRoute,
  herdSetup,
  stats,
  user,
  onLogout,
  children
}) {
  return (
    <div className="min-h-screen px-4 py-4 md:px-6 md:py-6">
      <div className="mx-auto grid max-w-7xl gap-6 xl:grid-cols-[290px_1fr]">
        <aside className="glass-panel rounded-[2rem] p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
              <Milk className="h-7 w-7 text-ambermilk" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                Dairy OS
              </p>
              <h2 className="font-display text-2xl text-white">Farm Manager</h2>
            </div>
          </div>

          <div className="mt-8 space-y-2">
            {routes.map((route) => {
              const active = activeRoute === route.key;

              return (
                <a
                  key={route.key}
                  href={`#/${route.key}`}
                  className={`block rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                    active
                      ? "bg-ambermilk text-ink"
                      : "bg-white/5 text-white/70 hover:bg-white/10"
                  }`}
                >
                  {route.label}
                </a>
              );
            })}
          </div>

          <div className="mt-8 space-y-4">
            <div className="sub-card">
              <div className="mb-4 flex items-center gap-2 text-ambermilk">
                <ShieldPlus className="h-4 w-4" />
                <span className="text-xs uppercase tracking-[0.24em]">
                  Herd Snapshot
                </span>
              </div>
              <div className="space-y-3 text-sm text-white/70">
                <p>Cows planned: {Number(herdSetup.cowsCount || 0)}</p>
                <p>Buffaloes planned: {Number(herdSetup.buffaloesCount || 0)}</p>
                <p>Milk capacity entered: {stats.totalMilkCapacity} L/day</p>
              </div>
            </div>
            <div className="sub-card">
              <p className="text-xs uppercase tracking-[0.24em] text-white/50">
                Logged In
              </p>
              <p className="mt-3 text-lg font-semibold text-white">
                {user?.fullName || "Farm Owner"}
              </p>
              <p className="mt-1 text-sm text-white/60">{user?.email || ""}</p>
            </div>
            <button className="ghost-button w-full gap-2" onClick={onLogout}>
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </aside>

        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <StatTile label="Cows" value={stats.cows} accent="text-ambermilk" />
            <StatTile
              label="Buffaloes"
              value={stats.buffaloes}
              accent="text-meadow"
            />
            <StatTile
              label="Milk Capacity"
              value={`${stats.totalMilkCapacity} L/day`}
              accent="text-white"
            />
          </div>
          <main className="glass-panel rounded-[2rem] p-6 md:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
