import { CheckCircle2, AlertCircle, X, Info } from "lucide-react";
import { useEffect } from "react";

export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  const isSuccess = toast.type === "success";
  const isError = toast.type === "error";

  return (
    <div
      role="alert"
      className="fixed bottom-6 right-4 sm:right-6 z-50 flex max-w-sm sm:max-w-md items-center gap-3 rounded-2xl border border-white/20 bg-slate-900/95 px-4 py-3.5 shadow-2xl backdrop-blur-2xl transition-all animate-in fade-in slide-in-from-bottom-4 duration-300"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10">
        {isSuccess ? (
          <CheckCircle2 className="h-5 w-5 text-meadow" />
        ) : isError ? (
          <AlertCircle className="h-5 w-5 text-alert" />
        ) : (
          <Info className="h-5 w-5 text-ambermilk" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs sm:text-sm font-semibold text-white truncate">
          {toast.title || (isSuccess ? "Success" : "Notification")}
        </p>
        <p className="text-[11px] sm:text-xs text-white/70 leading-4 mt-0.5">
          {toast.message}
        </p>
      </div>
      <button
        onClick={onClose}
        className="ml-auto flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-white/50 transition hover:bg-white/10 hover:text-white"
        aria-label="Close notification"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
