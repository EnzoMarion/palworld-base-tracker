type ActivityItem = {
    id: string;
    userName: string;
    action: string;
    createdAt: Date;
};

export function RecentActivity({ items }: { items: ActivityItem[] }) {
    return (
        <div className="space-y-3">
            {items.slice(0, 8).map((item) => (
                <div
                    key={item.id}
                    className="rounded-xl border border-zinc-800 bg-zinc-950 p-4"
                >
                    <p className="font-medium text-white">{item.userName}</p>
                    <p className="text-sm text-zinc-300">{item.action}</p>
                    <p className="mt-1 text-xs text-zinc-500">
                        {new Date(item.createdAt).toLocaleString("fr-FR")}
                    </p>
                </div>
            ))}
        </div>
    );
}