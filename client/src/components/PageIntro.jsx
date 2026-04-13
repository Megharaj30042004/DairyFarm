export default function PageIntro({ eyebrow, title, copy, actions }) {
  return (
    <div className="mb-8 flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
      <div>
        <p className="mb-3 text-xs uppercase tracking-[0.35em] text-ambermilk">
          {eyebrow}
        </p>
        <h1 className="page-title">{title}</h1>
        <p className="page-copy mt-4">{copy}</p>
      </div>
      {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
    </div>
  );
}
