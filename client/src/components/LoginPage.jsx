import { LockKeyhole, Milk, ShieldCheck, Sparkles, TrendingUp, HeartPulse, CheckCircle2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
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

  const autoSubmittedRef = useRef(false);

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setError("");

    if (mode === "login") {
      if (!form.email || !form.email.trim()) {
        setError("Validation Failed: Email address or phone number is required.");
        return;
      }
      if (!form.password || !form.password.trim()) {
        setError("Validation Failed: Password is required.");
        return;
      }
    } else {
      if (!form.fullName || !form.fullName.trim()) {
        setError("Validation Failed: Full Name is required.");
        return;
      }
      if (!form.village || !form.village.trim()) {
        setError("Validation Failed: Village / District is required.");
        return;
      }
      if (!form.mobileNumber || !form.mobileNumber.trim()) {
        setError("Validation Failed: Mobile Number is required.");
        return;
      }
      if (!form.email || !form.email.trim()) {
        setError("Validation Failed: Email address is required.");
        return;
      }
      if (!form.password || !form.password.trim()) {
        setError("Validation Failed: Password is required.");
        return;
      }
    }

    try {
      setIsSubmitting(true);

      const response =
        mode === "login"
          ? await api.login({
              identifier: form.email.trim(),
              email: form.email.trim(),
              password: form.password
            })
          : await api.register(form);

      onAuthSuccess(response);
    } catch (requestError) {
      setError(requestError.message || "Authentication failed. Please check your credentials.");
      autoSubmittedRef.current = false;
    } finally {
      setIsSubmitting(false);
    }
  };

  // Keyboard Enter auto-submit on keydown
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Auto-login trigger when email/phone and password are complete
  useEffect(() => {
    if (mode !== "login" || isSubmitting || autoSubmittedRef.current) return;

    const emailTrimmed = form.email.trim();
    const passTrimmed = form.password.trim();

    // Check if email or 10-digit mobile and password >= 4 chars
    const isValidIdentifier = emailTrimmed.includes("@") || emailTrimmed.length >= 10;
    const isValidPassword = passTrimmed.length >= 4;

    if (isValidIdentifier && isValidPassword) {
      autoSubmittedRef.current = true;
      const timer = setTimeout(() => {
        handleSubmit();
      }, 400); // 400ms smooth debounce after typing

      return () => clearTimeout(timer);
    }
  }, [form.email, form.password, mode, isSubmitting]);

  return (
    <section className="relative min-h-screen overflow-hidden bg-hero bg-cover bg-center">
      <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[2px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.25),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.25),transparent_45%)]" />
      
      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center justify-center lg:justify-between px-4 py-8 sm:px-6 md:px-10 lg:px-12">
        {/* Left Hero Pitch */}
        <div className="hidden max-w-2xl lg:block">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/40 bg-sky-950/40 px-4 py-1.5 backdrop-blur-md">
            <Sparkles className="h-4 w-4 text-sky-300" />
            <span className="text-xs font-extrabold uppercase tracking-[0.25em] text-sky-300">
              Smart Dairy & Livestock Platform
            </span>
          </div>
          <h1 className="mt-6 font-display text-6xl xl:text-7xl font-extrabold leading-[1.08] text-white tracking-tight">
            Elevate Your Herd <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-300 via-sky-200 to-blue-300">
              Yield & Profitability.
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-200">
            Precision livestock tracking, milk production analytics, marketplace trading, and automated veterinary assistance in one sleek enterprise portal.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-4 max-w-lg">
            <div className="rounded-2xl border border-sky-400/25 bg-slate-800/60 p-4 backdrop-blur-md">
              <ShieldCheck className="h-6 w-6 text-sky-300 mb-2" />
              <p className="text-xs font-bold text-white">Full Security</p>
              <p className="text-[11px] text-slate-300">Encrypted Cloud API</p>
            </div>
            <div className="rounded-2xl border border-sky-400/25 bg-slate-800/60 p-4 backdrop-blur-md">
              <TrendingUp className="h-6 w-6 text-ambermilk mb-2" />
              <p className="text-xs font-bold text-white">Yield Tracking</p>
              <p className="text-[11px] text-slate-300">Milk Analytics</p>
            </div>
            <div className="rounded-2xl border border-sky-400/25 bg-slate-800/60 p-4 backdrop-blur-md">
              <HeartPulse className="h-6 w-6 text-sky-400 mb-2" />
              <p className="text-xs font-bold text-white">Vet Guide</p>
              <p className="text-[11px] text-slate-300">AI Assistant</p>
            </div>
          </div>
        </div>

        {/* Right Glass Auth Form */}
        <div className="glass-panel w-full max-w-md rounded-[2.25rem] p-6 sm:p-8 border-sky-400/35 shadow-2xl">
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 via-sky-300 to-blue-500 text-slate-950 font-bold shadow-sky-glow">
              <Milk className="h-7 w-7" />
            </div>
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-sky-300">
                Dairy OS Portal
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                {mode === "login" ? "Sign In" : "Register Farm"}
              </h2>
            </div>
          </div>

          <div className="mb-6 grid grid-cols-2 rounded-2xl border border-sky-400/30 bg-slate-900/80 p-1.5 backdrop-blur-md">
            <button
              type="button"
              className={`min-h-[44px] rounded-xl px-4 py-2 text-xs sm:text-sm font-extrabold transition-all duration-200 ${
                mode === "login" ? "bg-gradient-to-r from-sky-400 to-blue-400 text-slate-950 shadow-sky-glow" : "text-slate-300 hover:text-white"
              }`}
              onClick={() => {
                setMode("login");
                autoSubmittedRef.current = false;
              }}
            >
              Sign In
            </button>
            <button
              type="button"
              className={`min-h-[44px] rounded-xl px-4 py-2 text-xs sm:text-sm font-extrabold transition-all duration-200 ${
                mode === "register" ? "bg-gradient-to-r from-sky-400 to-blue-400 text-slate-950 shadow-sky-glow" : "text-slate-300 hover:text-white"
              }`}
              onClick={() => {
                setMode("register");
                autoSubmittedRef.current = false;
              }}
            >
              New Account
            </button>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="space-y-4"
          >
            {mode === "register" ? (
              <>
                <FormField
                  label="Full Name"
                  value={form.fullName}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, fullName: event.target.value }))
                  }
                  onKeyDown={handleKeyDown}
                  placeholder="Ramesh Gowda"
                />
                <FormField
                  label="Village / District"
                  value={form.village}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, village: event.target.value }))
                  }
                  onKeyDown={handleKeyDown}
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
                  onKeyDown={handleKeyDown}
                  placeholder="9876543210"
                />
              </>
            ) : null}
            <FormField
              label={mode === "login" ? "Email or Mobile Number" : "Email Address"}
              type="text"
              value={form.email}
              onChange={(event) =>
                setForm((current) => ({ ...current, email: event.target.value }))
              }
              onKeyDown={handleKeyDown}
              placeholder={mode === "login" ? "owner@dairyfarm.app or 9876543210" : "owner@dairyfarm.app"}
            />
            <FormField
              label="Password"
              type="password"
              value={form.password}
              onChange={(event) =>
                setForm((current) => ({ ...current, password: event.target.value }))
              }
              onKeyDown={handleKeyDown}
              placeholder="••••••••••••"
            />

            {mode === "login" && (
              <div className="flex items-center gap-2 pt-1 text-[11px] text-sky-300 font-semibold">
                <CheckCircle2 className="h-3.5 w-3.5 text-sky-400" />
                <span>Auto-login enabled on valid credentials or Keyboard ↵ Enter</span>
              </div>
            )}

            {error ? (
              <p className="mt-4 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-xs sm:text-sm text-red-300 font-medium">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              className="primary-button mt-6 w-full gap-2 min-h-[50px] text-base"
              disabled={isSubmitting}
            >
              <LockKeyhole className="h-5 w-5" />
              {isSubmitting
                ? "Authenticating..."
                : mode === "login"
                  ? "Access Farm Workspace (↵ Enter)"
                  : "Create Manager Account (↵ Enter)"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
