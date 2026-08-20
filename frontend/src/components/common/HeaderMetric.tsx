interface HeaderMetricProps {
  label: string;
  value: number | string;
}

export function HeaderMetric({ label, value }: HeaderMetricProps) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-0.5 text-sm font-semibold text-slate-900">{value}</p>
    </div>
  );
}
