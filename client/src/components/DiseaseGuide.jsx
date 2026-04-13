import { diseaseGuide } from "../data/mockData";

export default function DiseaseGuide() {
  return (
    <section className="section-shell">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.35em] text-ambermilk">
          Module 05
        </p>
        <h2 className="font-display text-3xl text-white md:text-4xl">
          Healthcare & Disease Guide
        </h2>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {diseaseGuide.map((disease) => (
          <article
            key={disease.id}
            className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6"
          >
            <h3 className="font-display text-2xl text-white">{disease.name}</h3>
            <div className="mt-6 space-y-5 text-sm leading-6 text-white/72">
              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.22em] text-ambermilk">
                  Symptoms
                </p>
                <p>{disease.symptoms}</p>
              </div>
              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.22em] text-ambermilk">
                  Medical Issues
                </p>
                <p>{disease.medicalIssues}</p>
              </div>
              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.22em] text-ambermilk">
                  Recovery & Prevention
                </p>
                <p>{disease.recovery}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
