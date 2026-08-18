import { ArrowUpRight, Check } from "lucide-react";
import DashboardPreview from "../dashboard/DashboardPreview";

export default function HeroSection() {
  return (
    <div className="mx-auto max-w-7xl px-6 pb-20 pt-20 lg:px-8 lg:pb-28 lg:pt-28">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15] md:text-6xl">
          Turn every raw issue <br />
          <span className="font-serif italic font-medium text-indigo-600">
            into progress.
          </span>
        </h1>

        <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-slate-600">
          Nylos Helpdesk gives teams a simple, structured way to create, assign,
          track, and resolve issues without losing visibility.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <button className="group bg-slate-950 hover:bg-slate-900 text-white font-semibold px-5 py-3 rounded-xl flex items-center justify-center gap-1.5 transition duration-200 text-sm shadow-md shadow-slate-950/10">
            See your tickets running
            <ArrowUpRight
              size={16}
              className="text-slate-400 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
            />
          </button>

          <a
            href="#features"
            className="rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 flex items-center justify-center shadow-sm"
          >
            Explore features
          </a>
        </div>
        <div className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm font-medium text-slate-600">
          {[
            "Secure authentication",
            "Server-side validation",
            "Structured workflows",
          ].map((text) => (
            <div key={text} className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100/60 shadow-sm shrink-0">
                <Check size={11} strokeWidth={3} />
              </span>
              <span className="tracking-tight text-slate-600">{text}</span>
            </div>
          ))}
        </div>
      </div>
      <DashboardPreview />
    </div>
  );
}
