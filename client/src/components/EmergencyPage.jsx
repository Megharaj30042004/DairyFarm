import PageIntro from "./PageIntro";
import { PhoneCall, AlertOctagon, ShieldAlert, Phone } from "lucide-react";

export default function EmergencyPage({ contacts }) {
  return (
    <div>
      <PageIntro
        eyebrow="Page 06"
        title="Emergency veterinary helplines"
        copy="Priority emergency helplines stay at the top, followed by 30 district service cards for instant speed-dialing and local veterinary response."
      />

      <div className="grid gap-5 grid-cols-1 lg:grid-cols-2">
        {contacts.priority.map((contact) => (
          <div
            key={contact._id}
            className="rounded-[1.75rem] border border-red-500/40 bg-gradient-to-br from-red-950/40 via-slate-900/60 to-slate-950/80 p-6 sm:p-7 shadow-2xl backdrop-blur-xl relative overflow-hidden group hover:border-red-500/60 transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-red-400">
                <ShieldAlert className="h-5 w-5 animate-pulse" />
                <span className="text-xs font-extrabold uppercase tracking-[0.25em]">
                  Priority Helpline
                </span>
              </div>
              <span className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
            </div>

            <h3 className="mt-3 font-display text-2xl sm:text-3xl font-extrabold text-white">
              {contact.title}
            </h3>

            <a
              href={`tel:${contact.phone}`}
              className="mt-5 inline-flex w-full min-h-[54px] items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-red-600 via-red-500 to-rose-600 px-6 py-3.5 text-2xl sm:text-3xl font-extrabold text-white shadow-lg transition-all duration-300 active:scale-[0.98] hover:brightness-110 hover:shadow-red-500/30"
            >
              <PhoneCall className="h-7 w-7 animate-bounce" />
              <span>{contact.phone}</span>
            </a>
            
            <p className="mt-4 text-xs sm:text-sm leading-relaxed text-slate-300/80">
              {contact.note}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 sm:mt-10">
        <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-4">
          District Veterinary Helplines
        </h3>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
          {contacts.districts.map((item) => (
            <div key={item._id} className="sub-card hover:border-red-500/30 transition-all duration-300 group">
              <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-3">
                <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-ambermilk">
                  {item.district}
                </span>
                <span className="text-[10px] font-bold text-slate-400">24/7 Helpline</span>
              </div>
              
              <div className="space-y-3">
                <a
                  href={`tel:${item.phone}`}
                  className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-red-500/15 border border-red-500/30 px-4 py-2.5 text-lg font-extrabold text-red-400 transition-all duration-200 hover:bg-red-500/25 hover:text-red-300 active:scale-95"
                >
                  <Phone className="h-4 w-4" />
                  <span>{item.phone}</span>
                </a>

                {item.backupHelpline ? (
                  <a
                    href={`tel:${item.backupHelpline}`}
                    className="block text-xs font-semibold text-slate-300 hover:text-white transition"
                  >
                    Backup: <span className="font-bold text-ambermilk">{item.backupHelpline}</span>
                  </a>
                ) : null}

                <p className="text-xs leading-relaxed text-slate-400">{item.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
