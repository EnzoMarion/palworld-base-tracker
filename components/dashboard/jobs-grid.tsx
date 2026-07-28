export function JobsGrid({ jobsMap }: { jobsMap: Record<string, number> }) {
    return (
        <div className="grid gap-3 md:grid-cols-3">
            {Object.entries(jobsMap).map(([job, count]) => (
                <div
                    key={job}
                    className="rounded-xl border border-zinc-800 bg-zinc-950 p-4"
                >
                    <p className="text-sm text-zinc-400">{job}</p>
                    <p className="text-2xl font-bold text-white">{count}</p>
                </div>
            ))}
        </div>
    );
}