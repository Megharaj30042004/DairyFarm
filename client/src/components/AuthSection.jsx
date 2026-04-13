import { LockKeyhole, Milk, UserPlus } from "lucide-react";

function AuthCard({ title, subtitle, icon, children, actionLabel }) {
  return (
    <div className="glass-panel w-full max-w-md rounded-[2rem] p-7 md:p-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-ambermilk">
          {icon}
        </div>
        <div>
          <h3 className="font-display text-2xl text-white">{title}</h3>
          <p className="text-sm text-white/65">{subtitle}</p>
        </div>
      </div>
      <div className="space-y-4">{children}</div>
      <button className="primary-button mt-6 w-full">{actionLabel}</button>
    </div>
  );
}

export default function AuthSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-hero bg-cover bg-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(240,199,119,0.22),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(122,162,124,0.2),transparent_30%)]" />
      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-between px-6 py-8 md:px-10 lg:px-12">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="glass-panel flex h-12 w-12 items-center justify-center rounded-2xl">
              <Milk className="h-6 w-6 text-ambermilk" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-white/60">
                Dairy Farm Suite
              </p>
              <h1 className="font-display text-2xl text-white md:text-3xl">
                Livestock Management
              </h1>
            </div>
          </div>
          <a href="#dashboard" className="ghost-button hidden md:inline-flex">
            Explore Dashboard
          </a>
        </header>

        <div className="grid items-center gap-8 py-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="max-w-2xl">
            <p className="mb-4 text-xs uppercase tracking-[0.4em] text-ambermilk">
              Premium dairy operations dashboard
            </p>
            <h2 className="font-display text-5xl leading-tight text-white md:text-7xl">
              Smarter herd care, healthier milk economics.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-7 text-white/72 md:text-lg">
              Manage cows and buffaloes, track profitability, list animals for sale,
              and access emergency care details from one elegant control center.
            </p>
          </div>

          <div className="grid gap-5 xl:grid-cols-2">
            <AuthCard
              title="Login"
              subtitle="Continue managing your farm"
              icon={<LockKeyhole className="h-5 w-5" />}
              actionLabel="Sign In"
            >
              <div>
                <label className="field-label">Email Address</label>
                <input className="field" type="email" placeholder="farmer@dairyfarm.app" />
              </div>
              <div>
                <label className="field-label">Password</label>
                <input className="field" type="password" placeholder="Enter your password" />
              </div>
            </AuthCard>

            <AuthCard
              title="Register"
              subtitle="Create your farm workspace"
              icon={<UserPlus className="h-5 w-5" />}
              actionLabel="Create Account"
            >
              <div>
                <label className="field-label">Full Name</label>
                <input className="field" type="text" placeholder="Ramesh Gowda" />
              </div>
              <div>
                <label className="field-label">Village / District</label>
                <input className="field" type="text" placeholder="Shivamogga, Karnataka" />
              </div>
              <div>
                <label className="field-label">Mobile Number</label>
                <input className="field" type="tel" placeholder="9876543210" />
              </div>
            </AuthCard>
          </div>
        </div>
      </div>
    </section>
  );
}
