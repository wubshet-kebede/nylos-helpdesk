import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="bg-[#fbfbfa] py-16 sm:py-24 border-t border-slate-200/60">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white px-6 py-12 text-center shadow-sm sm:px-12 sm:py-16"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-indigo-500/5 blur-3xl" />
          <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-indigo-500/5 blur-3xl" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl leading-tight">
              Ready to clear your software backlog? <br />
              <span className="font-serif italic font-medium text-indigo-600">
                Let's get started.
              </span>
            </h2>

            <p className="mx-auto mt-4 max-w-md text-sm sm:text-base text-slate-600 leading-relaxed">
              Get your development sprints fully organized and operational. Dive
              straight into your pragmatic workspace dashboard today.
            </p>

            <div className="mt-8 flex justify-center">
              <button className="group inline-flex items-center gap-1.5 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition duration-200 hover:bg-slate-900 shadow-md shadow-slate-950/10">
                Enter your workspace
                <ArrowUpRight
                  size={14}
                  className="text-slate-400 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
                />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
