import { LogOut, Menu, Milk, ShieldPlus, User, X } from "lucide-react";
import { useState } from "react";
import ConfirmationModal from "./ConfirmationModal";
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const activeRouteObj = routes.find((r) => r.key === activeRoute) || routes[0];

  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    onLogout();
  };

  return (
    <div className="min-h-screen px-3 py-3 sm:px-4 sm:py-4 md:px-6 md:py-6">
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

      {/* Mobile Top Header */}
      <header className="glass-panel sticky top-2 z-40 mb-4 flex items-center justify-between rounded-2xl px-4 py-3 xl:hidden">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ambermilk/10 text-ambermilk">
            <Milk className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-white/50">
              Dairy OS
            </p>
            <h2 className="font-display text-base font-semibold text-white">
              {activeRouteObj.label}
            </h2>
          </div>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-white transition active:scale-95"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </header>

      {/* Mobile Slide-over Drawer Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm transition-opacity xl:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Drawer Menu */}
      <aside
        className={`fixed inset-y-0 right-0 z-50 w-[85%] max-w-xs transform bg-slate-900/95 p-6 shadow-2xl backdrop-blur-2xl transition-transform duration-300 ease-in-out xl:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ambermilk/20">
              <Milk className="h-5 w-5 text-ambermilk" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">
                Dairy OS
              </p>
              <h3 className="font-display text-lg text-white">Farm Manager</h3>
            </div>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white/80"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-5 space-y-1.5 overflow-y-auto max-h-[calc(100vh-250px)]">
          {routes.map((route) => {
            const active = activeRoute === route.key;
            return (
              <a
                key={route.key}
                href={`#/${route.key}`}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition active:scale-[0.98] ${
                  active
                    ? "bg-ambermilk text-ink font-bold"
                    : "bg-white/5 text-white/80 hover:bg-white/10"
                }`}
              >
                <span>{route.label}</span>
              </a>
            );
          })}
        </div>

        <div className="absolute bottom-6 left-6 right-6 space-y-3">
          <div className="rounded-xl border border-white/10 bg-white/5 p-3.5">
            <div className="flex items-center gap-2 text-white/60">
              <User className="h-4 w-4 text-ambermilk" />
              <span className="text-xs font-semibold text-white">
                {user?.fullName || "Farm Owner"}
              </span>
            </div>
            <p className="mt-1 text-[11px] text-white/50 truncate">
              {user?.email || ""}
            </p>
          </div>
          <button
            className="ghost-button w-full min-h-[44px] py-2 text-xs gap-2"
            onClick={() => {
              setMobileMenuOpen(false);
              setShowLogoutModal(true);
            }}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>

      <div className="mx-auto grid max-w-7xl gap-4 sm:gap-6 xl:grid-cols-[280px_1fr]">
        {/* Desktop Sidebar */}
        <aside className="glass-panel hidden rounded-[2rem] p-5 xl:block">
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
            <button className="ghost-button w-full gap-2" onClick={() => setShowLogoutModal(true)}>
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="space-y-4 sm:space-y-6">
          {/* Quick Mobile Horizontal Touch Route Tabs Bar */}
          <nav className="no-scrollbar flex items-center gap-2 overflow-x-auto pb-1 pt-1">
            {routes.map((route) => {
              const active = activeRoute === route.key;
              return (
                <a
                  key={route.key}
                  href={`#/${route.key}`}
                  className={`inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-2xl px-4 py-2.5 text-xs sm:text-sm font-semibold transition active:scale-95 ${
                    active
                      ? "bg-ambermilk text-ink shadow-lg shadow-ambermilk/20 font-bold"
                      : "border border-white/10 bg-white/10 text-white/80 hover:bg-white/15"
                  }`}
                >
                  {route.label}
                </a>
              );
            })}
          </nav>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-3 gap-2.5 sm:gap-4">
            <StatTile label="Cows" value={stats.cows} accent="text-ambermilk" />
            <StatTile
              label="Buffaloes"
              value={stats.buffaloes}
              accent="text-meadow"
            />
            <StatTile
              label="Milk Capacity"
              value={`${stats.totalMilkCapacity} L/d`}
              accent="text-white"
            />
          </div>

          <main className="glass-panel rounded-[1.5rem] p-4 sm:rounded-[2rem] sm:p-6 md:p-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}


