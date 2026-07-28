export function JobsGrid({
                             jobsMap,
                             totalSlots
                         }: {
    jobsMap: Record<string, number>,
    totalSlots?: number
}) {
    return (
        <div className="grid gap-4 md:grid-cols-3">
            {Object.entries(jobsMap).map(([job, count]) => (
                <div
                    key={job}
                    className="rounded-xl border border-slate-800 bg-slate-950 p-4 transition-all hover:border-sky-800/50"
                >
                    <p className="text-sm font-medium text-slate-400">{job}</p>
                    <div className="mt-2 flex items-end justify-between">
                        <p className="text-2xl font-bold text-white">{count}</p>
                        {totalSlots && (
                            <p className="text-xs font-medium text-slate-500">
                                {Math.round((count / totalSlots) * 100)}%
                            </p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}