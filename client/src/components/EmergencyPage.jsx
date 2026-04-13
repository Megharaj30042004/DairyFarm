import PageIntro from "./PageIntro";

export default function EmergencyPage({ contacts }) {
  return (
    <div>
      <PageIntro
        eyebrow="Page 06"
        title="Emergency veterinary help"
        copy="Priority helplines stay at the top, followed by 30 district service cards for quick dialing and local reference."
      />

      <div className="grid gap-4 lg:grid-cols-2">
        {contacts.priority.map((contact) => (
          <div
            key={contact._id}
            className="rounded-[1.75rem] border border-alert/25 bg-alert/10 p-6"
          >
            <p className="text-xs uppercase tracking-[0.24em] text-alert/80">
              Priority Contact
            </p>
            <h3 className="mt-3 text-2xl font-semibold text-white">{contact.title}</h3>
            <a
              href={`tel:${contact.phone}`}
              className="mt-5 inline-flex rounded-2xl bg-alert/20 px-4 py-3 text-3xl font-bold text-alert"
            >
              {contact.phone}
            </a>
            <p className="mt-4 text-sm leading-6 text-white/70">{contact.note}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {contacts.districts.map((item) => (
          <div key={item._id} className="sub-card">
            <p className="text-xs uppercase tracking-[0.22em] text-alert/75">
              {item.district}
            </p>
            <div className="mt-4 space-y-3">
              <a href={`tel:${item.ambulance}`} className="block text-2xl font-bold text-alert">
                Ambulance: {item.ambulance}
              </a>
              <a
                href={`tel:${item.backupHelpline}`}
                className="block text-sm font-semibold text-white/80"
              >
                Backup helpline: {item.backupHelpline}
              </a>
              <p className="text-sm leading-6 text-white/60">{item.note}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
