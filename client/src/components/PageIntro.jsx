import { Sparkles } from "lucide-react";

export default function PageIntro({ eyebrow, title, copy, actions }) {
  return (
    <div className="mb-8 pb-6 border-b border-sky-400/25 flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/35 bg-sky-950/40 px-3.5 py-1 mb-3 backdrop-blur-md">
          <Sparkles className="h-3.5 w-3.5 text-sky-300" />
          <span className="text-[11px] font-extrabold uppercase tracking-[0.25em] text-sky-300">
            {eyebrow}
          </span>
        </div>
        <h1 className="page-title gradient-title">{title}</h1>
        <p className="page-copy mt-3 text-slate-200/90">{copy}</p>
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-3 shrink-0">{actions}</div> : null}
    </div>
  );
}
