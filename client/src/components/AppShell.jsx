import {
  LogOut,
  Menu,
  Milk,
  ShieldPlus,
  User,
  X,
  Sparkles,
  Activity,
  LayoutDashboard,
  Beef,
  TrendingUp,
  Store,
  PhoneCall,
  Stethoscope,
  Bot
} from "lucide-react";
import { useState } from "react";
import ConfirmationModal from "./ConfirmationModal";
import StatTile from "./StatTile";

const routeIcons = {
  setup: LayoutDashboard,
  cows: Beef,
  buffaloes: Milk,
  finance: TrendingUp,
  marketplace: Store,
  emergency: PhoneCall,
  diseases: Stethoscope,
  chatbot: Bot
};

export default function AppShell({
  routes,
  activeRoute,
  herdSetup,
  stats,
  user,
  onLogout,
  children
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const activeRouteObj = routes.find((r) => r.key === activeRoute) || routes[0];

  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    onLogout();
  };

  return (
    <div className="min-h-screen px-3 py-3 sm:px-5 sm:py-5 md:px-8 md:py-8 max-w-[1600px] mx-auto">
      {/* Logout Confirmation Modal Popup */}
      <ConfirmationModal
        isOpen={showLogoutModal}
        title="ವಂದನೆಗಳು! Log Out of Dairy OS?"
        message="Are you sure you want to end your active farm management session? (ಧನ್ಯವಾದಗಳು!)"
        confirmLabel="ವಂದನೆಗಳು - Confirm Logout"
        cancelLabel="Cancel"
        isDanger={true}
        onConfirm={handleConfirmLogout}
        onCancel={() => setShowLogoutModal(false)}
      />

      {/* Unified Mobile Top Executive Header */}
      <header className="glass-panel sticky top-3 z-40 mb-5 flex items-center justify-between rounded-2xl px-4 py-3.5 xl:hidden border-sky-400/25 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 via-blue-500 to-sky-300 text-slate-950 font-bold shadow-sky-glow">
            <Milk className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />
              <p className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-sky-400">
                Dairy OS Enterprise
              </p>
            </div>
            <h2 className="font-display text-base sm:text-lg font-bold text-white tracking-tight">
              {activeRouteObj.label}
            </h2>
          </div>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-sky-400/35 bg-sky-950/40 text-white transition active:scale-95 hover:border-sky-300"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5 text-sky-400" /> : <Menu className="h-5 w-5" />}
        </button>
      </header>

      {/* Mobile Slide-over Drawer Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xl transition-opacity xl:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Drawer Navigation Menu */}
      <aside
        className={`fixed inset-y-0 right-0 z-50 w-[85%] max-w-sm transform bg-slate-900/98 p-6 shadow-2xl backdrop-blur-2xl transition-transform duration-300 ease-in-out border-l border-sky-400/25 xl:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-sky-400/25 pb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 to-blue-500 text-slate-950 font-bold shadow-sky-glow">
              <Milk className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-sky-400">
                Dairy OS v2.4
              </p>
              <h3 className="font-display text-xl font-bold text-white">Farm Workspace</h3>
            </div>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-900/40 text-white hover:bg-sky-900/60"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="mt-6 space-y-2 overflow-y-auto max-h-[calc(100vh-260px)] pr-1">
          {routes.map((route) => {
            const active = activeRoute === route.key;
            const Icon = routeIcons[route.key] || Sparkles;

            return (
              <a
                key={route.key}
                href={`#/${route.key}`}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between rounded-2xl px-4 py-3.5 text-sm font-bold transition-all duration-200 active:scale-[0.98] ${
                  active
                    ? "bg-gradient-to-r from-sky-400 via-sky-300 to-blue-400 text-slate-950 font-extrabold shadow-sky-glow"
                    : "bg-white/[0.04] text-slate-200 hover:bg-white/[0.08] hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`h-5 w-5 ${active ? "text-slate-950" : "text-sky-400"}`} />
                  <span>{route.label}</span>
                </div>
                {active && <Sparkles className="h-4 w-4 text-slate-950" />}
              </a>
            );
          })}
        </nav>

        <div className="absolute bottom-6 left-6 right-6 space-y-3">
          <div className="rounded-2xl border border-sky-400/25 bg-slate-800/80 p-4 backdrop-blur-md">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-400/20 text-sky-300 font-bold">
                <User className="h-4 w-4" />
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-white truncate">
                  {user?.fullName || "Farm Manager"}
                </p>
                <p className="text-[11px] text-slate-300 truncate">
                  {user?.email || "Manager Account"}
                </p>
              </div>
            </div>
          </div>
          <button
            className="ghost-button w-full min-h-[46px] py-2 text-xs gap-2"
            onClick={() => {
              setMobileMenuOpen(false);
              setShowLogoutModal(true);
            }}
          >
            <LogOut className="h-4 w-4 text-red-400" />
            Logout Session
          </button>
        </div>
      </aside>

      {/* Main Single Layout Grid */}
      <div className="grid gap-6 xl:grid-cols-[300px_1fr]">
        {/* Desktop Single Master Sidebar */}
        <aside className="glass-panel hidden rounded-[2.25rem] p-6 xl:flex flex-col justify-between min-h-[calc(100vh-4rem)] sticky top-8 border-sky-400/30">
          <div>
            {/* Brand Logo Header */}
            <div className="flex items-center gap-3.5 pb-6 border-b border-sky-400/25">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 via-blue-500 to-sky-300 text-slate-950 font-extrabold shadow-sky-glow">
                <Milk className="h-8 w-8" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-sky-400 animate-pulse" />
                  <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-sky-400">
                    Enterprise
                  </span>
                </div>
                <h2 className="font-display text-2xl font-bold text-white tracking-tight">
                  Dairy OS
                </h2>
              </div>
            </div>

            {/* Navigation Link List with Icons */}
            <nav className="mt-7 space-y-2">
              {routes.map((route) => {
                const active = activeRoute === route.key;
                const Icon = routeIcons[route.key] || Sparkles;

                return (
                  <a
                    key={route.key}
                    href={`#/${route.key}`}
                    className={`flex items-center justify-between rounded-2xl px-4 py-3.5 text-sm font-bold transition-all duration-200 ${
                      active
                        ? "bg-gradient-to-r from-sky-400 via-sky-300 to-blue-400 text-slate-950 font-extrabold shadow-sky-glow scale-[1.02]"
                        : "bg-white/[0.04] text-slate-200 hover:bg-white/[0.09] hover:text-white border border-transparent hover:border-sky-400/30"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-xl transition ${
                          active
                            ? "bg-slate-950/20 text-slate-950"
                            : "bg-sky-950/50 text-sky-300 group-hover:bg-sky-400/20"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <span>{route.label}</span>
                    </div>
                    {active && (
                      <span className="flex h-2.5 w-2.5 rounded-full bg-slate-950 shadow-sm" />
                    )}
                  </a>
                );
              })}
            </nav>
          </div>

          {/* Bottom Card Summary & Account */}
          <div className="mt-8 space-y-4 pt-6 border-t border-sky-400/25">
            <div className="sub-card bg-slate-900/70 border-sky-400/25">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sky-400">
                  <Activity className="h-4 w-4" />
                  <span className="text-[11px] font-extrabold uppercase tracking-[0.2em]">
                    Active Herd
                  </span>
                </div>
                <span className="px-2.5 py-0.5 text-[10px] font-extrabold rounded-full bg-sky-400/20 text-sky-300 border border-sky-400/35">
                  Live Sync
                </span>
              </div>
              <div className="space-y-2 text-xs text-slate-200">
                <div className="flex justify-between">
                  <span className="text-slate-400">Cows Planned:</span>
                  <span className="font-extrabold text-ambermilk">{Number(herdSetup.cowsCount || 0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Buffaloes Planned:</span>
                  <span className="font-extrabold text-sky-400">{Number(herdSetup.buffaloesCount || 0)}</span>
                </div>
                <div className="flex justify-between pt-1.5 border-t border-white/10">
                  <span className="text-slate-400">Milk Capacity:</span>
                  <span className="font-extrabold text-white">{stats.totalMilkCapacity} L/day</span>
                </div>
              </div>
            </div>

            <div className="sub-card bg-slate-900/70 border-sky-400/25">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-slate-400">
                Current Session
              </p>
              <div className="mt-2.5 flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 to-blue-500 text-slate-950 font-extrabold border border-sky-300/50 shadow-sky-glow">
                  {user?.fullName ? user.fullName[0].toUpperCase() : "M"}
                </div>
                <div className="overflow-hidden">
                  <p className="text-sm font-bold text-white truncate">
                    {user?.fullName || "Farm Manager"}
                  </p>
                  <p className="text-xs text-slate-300 truncate">{user?.email || ""}</p>
                </div>
              </div>
            </div>

            <button className="ghost-button w-full gap-2 text-xs" onClick={() => setShowLogoutModal(true)}>
              <LogOut className="h-4 w-4 text-red-400" />
              Sign Out Session
            </button>
          </div>
        </aside>

        {/* Main Workspace View */}
        <div className="space-y-5 sm:space-y-6">
          {/* Master Stats Summary Bar */}
          <div className="grid grid-cols-3 gap-3 sm:gap-5">
            <StatTile label="Cows Managed" value={stats.cows} accent="text-ambermilk" />
            <StatTile
              label="Buffaloes Managed"
              value={stats.buffaloes}
              accent="text-sky-300"
            />
            <StatTile
              label="Daily Milk Capacity"
              value={`${stats.totalMilkCapacity} L/d`}
              accent="text-sky-400"
            />
          </div>

          <main className="glass-panel rounded-[1.75rem] p-5 sm:rounded-[2.25rem] sm:p-7 md:p-9 border-sky-400/25 shadow-2xl">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}


