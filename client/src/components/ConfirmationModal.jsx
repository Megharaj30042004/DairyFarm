import { AlertTriangle, X } from "lucide-react";
import { useEffect } from "react";

export default function ConfirmationModal({
  isOpen,
  title = "Are you sure?",
  message = "Please confirm your action to proceed.",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  isDanger = false
}) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        onConfirm();
      } else if (event.key === "Escape") {
        event.preventDefault();
        onCancel();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onConfirm, onCancel]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onCancel}
      />

      {/* Modal Box */}
      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-[1.5rem] border border-sky-400/30 bg-slate-900/95 p-6 shadow-2xl backdrop-blur-2xl animate-in zoom-in-95 duration-200">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${
                isDanger ? "bg-red-500/20 text-red-400" : "bg-sky-400/20 text-sky-300"
              }`}
            >
              <AlertTriangle className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-display text-lg sm:text-xl text-white font-semibold">
                {title}
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-slate-300 leading-5">
                {message}
              </p>
            </div>
          </div>
          <button
            onClick={onCancel}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white/60 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3 border-t border-sky-400/20 pt-4">
          <button
            onClick={onCancel}
            className="ghost-button min-h-[42px] px-4 py-2 text-xs sm:text-sm font-semibold"
          >
            {cancelLabel} (Esc)
          </button>
          <button
            onClick={onConfirm}
            className={`inline-flex min-h-[42px] items-center justify-center rounded-2xl px-5 py-2 text-xs sm:text-sm font-extrabold transition active:scale-95 shadow-md ${
              isDanger
                ? "bg-red-500 text-white hover:bg-red-600 shadow-red-500/30"
                : "bg-gradient-to-r from-sky-400 to-blue-400 text-slate-950 hover:brightness-110 shadow-sky-400/30"
            }`}
          >
            {confirmLabel} (↵ Enter)
          </button>
        </div>
      </div>
    </div>
  );
}
