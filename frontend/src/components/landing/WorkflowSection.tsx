// src/components/landing/WorkflowSection.tsx
import { motion } from "framer-motion";
import {
  CheckCircle2,
  CircleCheck,
  CircleDot,
  LoaderCircle,
  FilePlus,
  UserCheck,
  CheckCircle,
} from "lucide-react";

const WORKFLOW = [
  {
    step: "01",
    title: "Create",
    description: "Report an issue with the information your team needs.",
    icon: FilePlus,
  },
  {
    step: "02",
    title: "Assign",
    description:
      "Give the ticket to the team member responsible for resolving it.",
    icon: UserCheck,
  },
  {
    step: "03",
    title: "Resolve",
    description: "Track progress and move the issue through its lifecycle.",
    icon: CheckCircle,
  },
] as const;

const LIFECYCLE_STEPS = [
  {
    number: "01",
    name: "Open",
    description: "Issue reported",
    icon: CircleDot,
    active: true,
  },
  {
    number: "02",
    name: "In Progress",
    description: "Work underway",
    icon: LoaderCircle,
    active: true,
  },
  {
    number: "03",
    name: "Resolved",
    description: "Solution completed",
    icon: CircleCheck,
    active: true,
  },
  {
    number: "04",
    name: "Closed",
    description: "Issue completed",
    icon: CheckCircle2,
    active: false,
  },
] as const;

const LIFECYCLE_METADATA = [
  {
    label: "Priority",
    value: "Urgent",
    detail: "Determines attention",
    badge: "ACTIVE",
    className: "text-rose-600 bg-rose-50",
  },
  {
    label: "Assignment",
    value: "Team member",
    detail: "Clear ownership",
    badge: "ACTIVE",
    className: "text-indigo-600 bg-indigo-50",
  },
  {
    label: "Resolution",
    value: "Tracked",
    detail: "Complete audit trail",
    badge: "ACTIVE",
    className: "text-emerald-600 bg-emerald-50",
  },
] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
} as const;
export default function WorkflowSection() {
  return (
    <section
      id="workflow"
      className="bg-[#fbfbfa] text-slate-900 border-t border-slate-200/60 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-bold italic uppercase tracking-widest text-slate-500 bg-white border border-indigo-100 px-3 py-1 rounded-full inline-block">
            Simple workflow
          </p>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl leading-tight">
            From issue to resolution
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            A clear workflow keeps everyone aligned and makes progress easy to
            understand.
          </p>
        </motion.div>
        <motion.div
          className="relative mt-20 grid gap-8 md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div
            className="absolute left-[15%] right-[15%] top-10 hidden h-px bg-linear-to-r from-slate-200/20 via-slate-300 to-slate-200/20 md:block"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
            style={{ originX: 0 }}
          />

          {WORKFLOW.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.step}
                variants={cardVariants}
                className="relative text-center group"
              >
                <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-slate-200 bg-white text-xl font-bold text-slate-500 shadow-sm transition-all duration-300 group-hover:border-indigo-300 group-hover:scale-105 group-hover:shadow-md">
                  <div className="absolute inset-0 rounded-full bg-indigo-50/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <span className="group-hover:hidden transition-all duration-200">
                    {item.step}
                  </span>
                  <Icon
                    size={24}
                    className="hidden group-hover:block text-indigo-600 transition-all duration-200"
                  />
                </div>

                <h3 className="mt-7 text-xl font-bold tracking-tight text-slate-950 group-hover:text-indigo-600 transition-colors duration-200">
                  {item.title}
                </h3>
                <p className="mx-auto mt-2.5 max-w-xs text-sm leading-relaxed text-slate-600">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* 2. Premium Ticket Lifecycle Visualization */}

        <motion.div
          className="mx-auto mt-24 max-w-5xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-8 text-center">
            <span className="inline-flex items-center italic  gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full" />
              Ticket lifecycle
            </span>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-900/4">
            <div className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-indigo-100/40 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-violet-100/40 blur-3xl" />

            <div className="relative p-6 sm:p-8 lg:p-10">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs italic font-semibold uppercase tracking-widest text-indigo-600">
                    Workflow engine
                  </p>

                  <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                    Every ticket has a clear path.
                  </h3>

                  <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
                    Track an issue from the moment it is reported until the work
                    is completed and the ticket is closed.
                  </p>
                </div>
              </div>
              <div className="mt-10">
                <div className="relative">
                  <div className="absolute left-0 right-0 top-8 hidden h-px bg-slate-200 sm:block" />

                  <motion.div
                    className="absolute left-0 top-8 hidden h-px origin-left bg-indigo-500 sm:block"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 1.5,
                      delay: 0.4,
                      ease: "easeInOut",
                    }}
                    style={{ width: "100%" }}
                  />

                  <div className="relative grid gap-5 sm:grid-cols-4">
                    {LIFECYCLE_STEPS.map((status, index) => {
                      const Icon = status.icon;

                      return (
                        <motion.div
                          key={status.name}
                          className="group"
                          initial={{ opacity: 0, y: 15 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.5,
                            delay: 0.45 + index * 0.12,
                          }}
                        >
                          <div className="flex items-center gap-4 sm:block">
                            <motion.div
                              className={`relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full border bg-white shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-md ${
                                status.active
                                  ? "border-indigo-200 text-indigo-600"
                                  : "border-slate-200 text-slate-400"
                              }`}
                              whileHover={{ scale: 1.08 }}
                            >
                              <div
                                className={`flex h-10 w-10 items-center justify-center rounded-full ${
                                  status.active ? "bg-indigo-50" : "bg-slate-50"
                                }`}
                              >
                                <Icon size={20} strokeWidth={2} />
                              </div>

                              {status.active && index === 1 && (
                                <motion.span
                                  className="absolute inset-0 rounded-full border border-indigo-400"
                                  animate={{
                                    scale: [1, 1.35],
                                    opacity: [0.5, 0],
                                  }}
                                  transition={{
                                    duration: 1.8,
                                    repeat: Infinity,
                                  }}
                                />
                              )}
                            </motion.div>

                            <div className="sm:mt-5">
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold tracking-widest text-slate-400">
                                  {status.number}
                                </span>

                                <h4
                                  className={`text-sm font-bold ${
                                    status.active
                                      ? "text-slate-950"
                                      : "text-slate-500"
                                  }`}
                                >
                                  {status.name}
                                </h4>
                              </div>

                              <p className="mt-1 text-xs text-slate-500">
                                {status.description}
                              </p>
                            </div>
                          </div>

                          {index < LIFECYCLE_STEPS.length - 1 && (
                            <div className="ml-8 mt-3 h-5 w-px bg-slate-200 sm:hidden" />
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <motion.div
                className="mt-10 border-t border-slate-100 pt-6"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold text-slate-900">
                      Built for clear ownership
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Every ticket keeps its priority, owner, and resolution
                      history.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {LIFECYCLE_METADATA.map((item) => (
                      <motion.div
                        key={item.label}
                        whileHover={{ y: -2 }}
                        transition={{ duration: 0.2 }}
                        className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm transition-all duration-200 hover:border-slate-300 hover:shadow-md"
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${item.className
                            .split(" ")
                            .find((className) => className.startsWith("bg-"))}`}
                        />

                        <span className="text-xs font-medium text-slate-500">
                          {item.label}
                        </span>

                        <span className="text-xs font-semibold text-slate-800">
                          {item.value}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
