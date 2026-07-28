import { getAllSlots } from "@/lib/queries";

export default async function JobsPage() {
    const slots = await getAllSlots();

    const jobsMap = slots.reduce<
        Record<string, { total: number; done: number; pals: string[] }>
    >((acc, slot) => {
        if (!acc[slot.targetJob]) {
            acc[slot.targetJob] = {
                total: 0,
                done: 0,
                pals: [],
            };
        }

        acc[slot.targetJob].total += 1;
        if (slot.status === "fully_done") {
            acc[slot.targetJob].done += 1;
        }
        acc[slot.targetJob].pals.push(slot.palName);

        return acc;
    }, {});

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold text-white">Métiers</h2>
                <p className="mt-2 text-zinc-400">
                    Répartition de la base par métier.
                </p>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
                {Object.entries(jobsMap).map(([job, data]) => (
                    <div
                        key={job}
                        className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5"
                    >
                        <div className="mb-4 flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-semibold text-white">{job}</h3>
                                <p className="text-sm text-zinc-400">
                                    {data.done}/{data.total} terminés
                                </p>
                            </div>

                            <div className="rounded-full bg-zinc-800 px-3 py-1 text-sm text-zinc-200">
                                {data.total}
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {data.pals.map((pal) => (
                                <span
                                    key={pal}
                                    className="rounded-full bg-zinc-950 px-3 py-1 text-sm text-zinc-300"
                                >
                  {pal}
                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}