import PageIntro from "./PageIntro";

export default function DiseasesPage({ diseases }) {
  return (
    <div>
      <PageIntro
        eyebrow="Page 07"
        title="Disease guide with Kannada names"
        copy="This guide combines English explanations with Kannada disease names so farm workers and owners can discuss symptoms and action steps more easily."
      />

      <div className="grid gap-5 xl:grid-cols-2">
        {diseases.map((disease) => (
          <article key={disease._id} className="sub-card">
            <h3 className="font-display text-2xl text-white">{disease.name}</h3>
            <div className="mt-6 space-y-5 text-sm leading-7 text-white/70">
              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.24em] text-ambermilk">
                  Symptoms / Attack Pattern
                </p>
                <p>{disease.symptoms}</p>
              </div>
              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.24em] text-ambermilk">
                  Medical Issues
                </p>
                <p>{disease.medicalIssues}</p>
              </div>
              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.24em] text-ambermilk">
                  Recovery / Prevention
                </p>
                <p>{disease.recovery}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
