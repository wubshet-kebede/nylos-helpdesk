export function TicketListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="divide-y divide-slate-100">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="animate-pulse px-4 py-4">
          <div className="flex gap-3">
            <div className="mt-1 h-2 w-2 rounded-full bg-slate-200" />

            <div className="flex-1 space-y-2">
              <div className="h-3 w-3/4 rounded bg-slate-100" />
              <div className="h-2.5 w-1/2 rounded bg-slate-100" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function TicketDetailsSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="border-b border-slate-100 px-6 py-6 lg:px-8">
        <div className="h-3 w-28 rounded bg-slate-100" />
        <div className="mt-4 h-6 w-2/3 rounded bg-slate-100" />
        <div className="mt-5 h-8 w-32 rounded-lg bg-slate-100" />
      </div>

      <div className="space-y-4 px-6 py-8 lg:px-8">
        <div className="h-3 w-24 rounded bg-slate-100" />
        <div className="h-3 w-full rounded bg-slate-100" />
        <div className="h-3 w-5/6 rounded bg-slate-100" />
        <div className="h-3 w-4/6 rounded bg-slate-100" />
      </div>
    </div>
  );
}
