import { PhoneCall, ShieldAlert } from "lucide-react";
import { emergencyContacts } from "../data/mockData";

export default function EmergencyDirectory() {
  return (
    <section className="section-shell border-alert/25 bg-[linear-gradient(180deg,rgba(248,131,121,0.16),rgba(255,255,255,0.06))]">
      <div className="mb-8 flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-alert/20 text-alert">
          <ShieldAlert className="h-7 w-7" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-alert">
            Module 03
          </p>
          <h2 className="font-display text-3xl text-white md:text-4xl">
            Emergency Veterinary Directory
          </h2>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {emergencyContacts.map((contact) => (
          <div
            key={contact.id}
            className="rounded-[1.75rem] border border-alert/20 bg-black/20 p-6"
          >
            <p className="text-sm uppercase tracking-[0.22em] text-alert/75">
              Emergency Helpline
            </p>
            <h3 className="mt-3 text-xl font-semibold text-white">{contact.title}</h3>
            <a
              href={`tel:${contact.phone}`}
              className="mt-5 inline-flex items-center gap-3 rounded-2xl bg-alert/15 px-4 py-3 text-2xl font-bold text-alert"
            >
              <PhoneCall className="h-5 w-5" />
              {contact.phone}
            </a>
            <p className="mt-4 text-sm leading-6 text-white/70">{contact.note}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
