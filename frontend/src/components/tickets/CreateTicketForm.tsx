import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowRight, FileText, Flag, Sparkles } from "lucide-react";

import Input from "../ui/Input";

const createTicketSchema = z.object({
  title: z
    .string()
    .min(1, "Ticket title is required")
    .max(120, "Title must be under 120 characters"),

  description: z
    .string()
    .min(10, "Please provide at least 10 characters")
    .max(5000, "Description is too long"),

  priority: z.enum(["Low", "Medium", "High", "Urgent"]),
});

type CreateTicketFormValues = z.infer<typeof createTicketSchema>;

interface CreateTicketFormProps {
  onSuccess: () => void;
}

const PRIORITIES = [
  {
    value: "Low",
    label: "Low",
    dot: "bg-slate-400",
    activeBg: "bg-slate-50 border-slate-200 text-slate-700",
  },
  {
    value: "Medium",
    label: "Medium",
    dot: "bg-blue-500",
    activeBg: "bg-blue-50/50 border-blue-200 text-blue-700",
  },
  {
    value: "High",
    label: "High",
    dot: "bg-amber-500",
    activeBg: "bg-amber-50/60 border-amber-200 text-amber-800",
  },
  {
    value: "Urgent",
    label: "Urgent",
    dot: "bg-red-500",
    activeBg: "bg-red-50 text-red-700 border-red-200",
  },
] as const;

export default function CreateTicketForm({ onSuccess }: CreateTicketFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CreateTicketFormValues>({
    resolver: zodResolver(createTicketSchema),
    defaultValues: {
      priority: "Medium",
    },
  });

  const selectedPriority = watch("priority");
  const description = watch("description") || "";

  const onSubmit = async (data: CreateTicketFormValues) => {
    try {
      console.log("Creating ticket:", data);
      // await ticketService.createTicket(data);
      onSuccess();
    } catch (error) {
      console.error("Failed to create ticket:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 text-left max-w-xl mx-auto"
    >
      <div className="bg-slate-50/50 border border-slate-200/80 rounded-2xl p-5 shadow-inner space-y-4">
        <div className="group relative">
          <Input
            id="title"
            label="Ticket Subject"
            type="text"
            placeholder="e.g., Connection pool exhausts under heavy active traffic"
            icon={FileText}
            error={errors.title?.message}
            {...register("title")}
          />
        </div>
        <div className="h-px bg-slate-200/60" />
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label
              htmlFor="description"
              className="text-xs font-bold text-slate-700 uppercase tracking-wide"
            >
              Detailed Context
            </label>
            <span
              className={`text-[10px] font-mono tracking-tight px-1.5 py-0.5 rounded border shadow-inner ${
                description.length > 4500
                  ? "bg-amber-50 text-amber-600 border-amber-200"
                  : "bg-white text-slate-400 border-slate-100"
              }`}
            >
              {description.length} / 5000
            </span>
          </div>

          <div className="relative rounded-xl shadow-sm">
            <textarea
              id="description"
              rows={5}
              placeholder="Provide clean execution logs, expected behavior, or staging replication metrics..."
              {...register("description")}
              className={`block w-full resize-none rounded-xl border bg-white px-3.5 py-2.5 text-sm leading-relaxed text-slate-800 focus:outline-none focus:ring-2 transition-all placeholder:text-slate-400 ${
                errors.description
                  ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
                  : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/10 hover:border-slate-300"
              }`}
            />
          </div>

          {errors.description && (
            <p className="mt-1.5 text-xs font-medium text-red-600 animate-pulse">
              {errors.description.message}
            </p>
          )}
        </div>
      </div>
      <div>
        <div className="mb-2.5 flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wide">
          <Flag size={13} className="text-slate-400" />
          <span>Urgency Priority Rating</span>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {PRIORITIES.map((priority) => {
            const selected = selectedPriority === priority.value;

            return (
              <button
                key={priority.value}
                type="button"
                onClick={() =>
                  setValue("priority", priority.value, {
                    shouldDirty: true,
                    shouldValidate: true,
                  })
                }
                className={`flex items-center justify-center gap-2 rounded-xl border p-2.5 text-xs font-bold transition-all shadow-sm cursor-pointer ${
                  selected
                    ? `${priority.activeBg} font-extrabold shadow-md ring-2 ring-indigo-500/10 scale-[1.02]`
                    : "border-slate-200/80 bg-white text-slate-500 hover:text-slate-800 hover:border-slate-300"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${priority.dot} ${selected ? "animate-pulse" : "opacity-80"}`}
                />
                {priority.label}
              </button>
            );
          })}
        </div>

        {errors.priority && (
          <p className="mt-1.5 text-xs font-medium text-red-600">
            {errors.priority.message}
          </p>
        )}
      </div>
      <div className="flex items-center justify-end gap-2.5 border-t border-slate-100 pt-5 mt-8">
        <button
          type="button"
          onClick={onSuccess}
          className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-600 transition hover:bg-slate-50 hover:text-slate-900 shadow-sm"
        >
          Dismiss
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="group inline-flex items-center gap-1.5 rounded-xl bg-slate-950 px-5 py-2.5 text-xs font-bold text-white transition hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-50 shadow-md shadow-slate-950/10"
        >
          {isSubmitting ? (
            <>
              <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/20 border-t-white" />
              <span>Indexing backlog...</span>
            </>
          ) : (
            <>
              <Sparkles
                size={13}
                className="text-slate-400 group-hover:text-white transition-colors"
              />
              <span>Publish Ticket</span>
              <ArrowRight
                size={13}
                className="text-slate-500 transition-transform group-hover:translate-x-0.5 group-hover:text-white"
              />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
