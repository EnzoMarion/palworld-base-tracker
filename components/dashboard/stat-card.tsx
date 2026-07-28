export function StatCard({
                             label,
                             value,
                             total,
                             icon,
                         }: {
    label: string;
    value: number;
    total?: number;
    icon?: string;
}) {
    return (
        <div className="rounded-2xl border border-sky-900/50 bg-slate-900/60 p-5 backdrop-blur-sm transition-colors hover:border-sky-500/50">
            <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-400">{label}</p>
                {icon && <span className="text-xl">{icon}</span>}
            </div>
            <div className="mt-4 flex items-baseline gap-2">
                <p className="text-3xl font-black text-white">{value}</p>
                {total !== undefined && (
                    <p className="text-sm font-medium text-slate-500">/ {total}</p>
                )}
            </div>
        </div>
    );
}