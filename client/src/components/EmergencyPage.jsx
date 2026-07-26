import PageIntro from "./PageIntro";

export default function EmergencyPage({ contacts }) {
  return (
    <div>
      <PageIntro
        eyebrow="Page 06"
        title="Emergency veterinary help"
        copy="Priority helplines stay at the top, followed by 30 district service cards for quick dialing and local reference."
      />

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        {contacts.priority.map((contact) => (
          <div
            key={contact._id}
            className="rounded-[1.25rem] sm:rounded-[1.75rem] border border-alert/25 bg-alert/10 p-4 sm:p-6"
          >
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.24em] text-alert/80 font-bold">
              Priority Contact
            </p>
            <h3 className="mt-2 text-xl sm:text-2xl font-semibold text-white">{contact.title}</h3>
            <a
              href={`tel:${contact.phone}`}
              className="mt-4 inline-flex min-h-[48px] items-center justify-center rounded-2xl bg-alert/25 px-5 py-3 text-2xl sm:text-3xl font-bold text-alert transition active:scale-95 hover:bg-alert/35"
            >
              {contact.phone}
            </a>
            <p className="mt-3 text-xs sm:text-sm leading-5 sm:leading-6 text-white/70">{contact.note}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 sm:mt-8 grid gap-3.5 sm:gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
        {contacts.districts.map((item) => (
          <div key={item._id} className="sub-card">
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.22em] text-alert/75 font-semibold">
              {item.district}
            </p>
            <div className="mt-3 space-y-2.5">
              <a href={`tel:${item.phone}`} className="block text-lg sm:text-xl font-bold text-alert transition active:scale-95">
                📞 {item.phone}
              </a>
              {item.backupHelpline ? (
                <a
                  href={`tel:${item.backupHelpline}`}
                  className="block text-xs sm:text-sm font-semibold text-white/80 transition active:scale-95"
                >
                  Backup Helpline: {item.backupHelpline}
                </a>
              ) : null}
              <p className="text-xs sm:text-sm leading-5 text-white/60">{item.note}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
