import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const FEATURES = [
  {
    number: "01",
    title: "Ticket Management",
    description:
      "Create, prioritize, assign, and track issues through a clear ticket lifecycle.",
  },
  {
    number: "02",
    title: "Team Collaboration",
    description:
      "Keep conversations connected to the issue with organized ticket comments.",
  },
  {
    number: "03",
    title: "Clear Ownership",
    description:
      "Assign tickets to the right team member and make responsibility visible.",
  },
  {
    number: "04",
    title: "Status Tracking",
    description:
      "Follow every issue from Open to In Progress, Resolved, and Closed.",
  },
  {
    number: "05",
    title: "Smart Filtering",
    description:
      "Find the issues that matter with status, priority, and assignee filters.",
  },
  {
    number: "06",
    title: "Secure Access",
    description:
      "Protect your workspace with authenticated access and role-based authorization.",
  },
] as const;

// Framer Motion configuration variants for parent container orchestration
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Delays each child card slightly for a clean waterfall effect
    },
  },
};

// Animation settings for individual cards
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
} as const;

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="scroll-mt-20 border-t border-slate-200/50 bg-[#fbfbfa]"
    >
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
        {/* Header Block with Subtle Scroll Reveal */}
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500 italic bg-indigo-50 px-3 py-1 rounded-full inline-block">
            Everything connected
          </p>

          <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl leading-tight">
            Everything your team needs <br className="hidden sm:block" /> to
            manage issues
          </h2>

          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            From the first report to the final resolution, keep every part of
            the workflow organized in one place.
          </p>
        </motion.div>

        {/* Animated Staggered Feature Cards Grid Container */}
        <motion.div
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }} // Triggers animation once when scrolled into view
        >
          {FEATURES.map((feature) => (
            <motion.div
              key={feature.number}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }} // Overrides standard CSS hover transforms flawlessly
              className="group relative rounded-2xl border border-slate-200/80 bg-white p-7 shadow-sm transition-colors duration-300 hover:border-indigo-300/80 hover:shadow-xl hover:shadow-indigo-900/5 cursor-pointer"
            >
              <div className="flex items-center justify-between">
                {/* Clean Number Badge Container */}
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 font-bold text-sm text-slate-500 border border-slate-100 group-hover:bg-indigo-50 group-hover:text-indigo-600 group-hover:border-indigo-100 transition-colors duration-300">
                  {feature.number}
                </div>

                {/* Polished Active Dynamic Hover Icon */}
                <ArrowUpRight
                  size={18}
                  className="text-slate-300 transition-all duration-300 group-hover:text-indigo-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </div>

              {/* Feature Content Strings */}
              <h3 className="mt-6 text-lg font-bold tracking-tight text-slate-950">
                {feature.title}
              </h3>

              <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
