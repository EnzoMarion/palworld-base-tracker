import { getActivity } from "@/lib/queries";

export default async function ActivityPage() {
    const items = await getActivity();

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold text-white">Activité</h2>
                <p className="mt-2 text-zinc-400">
                    Historique des changements de l’équipe.
                </p>
            </div>

            <div className="grid gap-3">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4"
                    >
                        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                            <div>
                                <p className="font-semibold text-white">{item.userName}</p>
                                <p className="text-sm text-zinc-300">{item.action}</p>
                            </div>

                            <p className="text-xs text-zinc-500">
                                {new Date(item.createdAt).toLocaleString("fr-FR")}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}