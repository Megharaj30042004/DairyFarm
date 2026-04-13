import { LockKeyhole, Milk } from "lucide-react";
import { useState } from "react";
import { api } from "../api";
import FormField from "./FormField";

export default function LoginPage({ onAuthSuccess, appError }) {
  const [mode, setMode] = useState("login");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(appError || "");
  const [form, setForm] = useState({
    fullName: "",
    village: "",
    mobileNumber: "",
    email: "",
    password: ""
  });

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setError("");

      const response =
        mode === "login"
          ? await api.login({
              email: form.email,
              password: form.password
            })
          : await api.register(form);

      onAuthSuccess(response);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-hero bg-cover bg-center">
      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(240,199,119,0.24),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(122,162,124,0.22),transparent_30%)]" />
      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center justify-between px-6 py-8 md:px-10 lg:px-12">
        <div className="hidden max-w-2xl lg:block">
          <p className="text-xs uppercase tracking-[0.4em] text-ambermilk">
            Dairy Farm & Livestock Management
          </p>
          <h1 className="mt-5 font-display text-7xl leading-none text-white">
            One calm place to run your entire herd.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/70">
            Login first, then move through dedicated pages for cows, buffaloes,
            finance, health guidance, and emergency support.
          </p>
        </div>

        <div className="glass-panel w-full max-w-md rounded-[2rem] p-7 md:p-8">
          <div className="mb-7 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
              <Milk className="h-7 w-7 text-ambermilk" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                Secure Login
              </p>
              <h2 className="font-display text-3xl text-white">Welcome Back</h2>
            </div>
          </div>

          <div className="mb-5 grid grid-cols-2 rounded-2xl border border-white/10 bg-white/5 p-1">
            <button
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                mode === "login" ? "bg-ambermilk text-ink" : "text-white/70"
              }`}
              onClick={() => setMode("login")}
            >
              Login
            </button>
            <button
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                mode === "register" ? "bg-ambermilk text-ink" : "text-white/70"
              }`}
              onClick={() => setMode("register")}
            >
              Register
            </button>
          </div>

          <div className="space-y-4">
            {mode === "register" ? (
              <>
                <FormField
                  label="Full Name"
                  value={form.fullName}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, fullName: event.target.value }))
                  }
                  placeholder="Ramesh Gowda"
                />
                <FormField
                  label="Village / District"
                  value={form.village}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, village: event.target.value }))
                  }
                  placeholder="Shivamogga"
                />
                <FormField
                  label="Mobile Number"
                  value={form.mobileNumber}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      mobileNumber: event.target.value
                    }))
                  }
                  placeholder="9876543210"
                />
              </>
            ) : null}
            <FormField
              label="Email Address"
              type="email"
              value={form.email}
              onChange={(event) =>
                setForm((current) => ({ ...current, email: event.target.value }))
              }
              placeholder="owner@dairyfarm.app"
            />
            <FormField
              label="Password"
              type="password"
              value={form.password}
              onChange={(event) =>
                setForm((current) => ({ ...current, password: event.target.value }))
              }
              placeholder="Enter password"
            />
          </div>

          {error ? (
            <p className="mt-4 rounded-2xl border border-alert/20 bg-alert/10 px-4 py-3 text-sm text-alert">
              {error}
            </p>
          ) : null}

          <button
            className="primary-button mt-6 w-full gap-2"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            <LockKeyhole className="h-4 w-4" />
            {isSubmitting
              ? "Please wait..."
              : mode === "login"
                ? "Login to Dashboard"
                : "Create Account"}
          </button>
        </div>
      </div>
    </section>
  );
}
