import { getAllSlots } from "@/lib/queries";
import { PalsTable } from "@/components/pals/pals-table";

export default async function PalsPage() {
    const pals = await getAllSlots();
    const doneCount = pals.filter((pal) => pal.status === "fully_done").length;
    const assignedCount = pals.filter((pal) => !!pal.assignedTo).length;

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold text-white">Pals</h2>
                <p className="mt-2 text-zinc-400">Liste complète de l'équipe de la base.</p>
            </div>

            <section className="grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
                    <p className="text-sm text-zinc-400">Total</p>
                    <p className="mt-2 text-3xl font-bold text-white">{pals.length}</p>
                </div>
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
                    <p className="text-sm text-zinc-400">Terminés</p>
                    <p className="mt-2 text-3xl font-bold text-white">{doneCount}</p>
                </div>
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
                    <p className="text-sm text-zinc-400">Assignés</p>
                    <p className="mt-2 text-3xl font-bold text-white">{assignedCount}</p>
                </div>
            </section>

            {/* Rendu du composant client */}
            <PalsTable pals={pals} />
        </div>
    );
}