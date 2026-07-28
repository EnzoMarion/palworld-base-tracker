import { JobsGrid } from "@/components/dashboard/jobs-grid";
import { StatCard } from "@/components/dashboard/stat-card";
import { getDashboardData } from "@/lib/queries";

export default async function Home() {
    const { allSlots, allTasks, doneSlots, doneTasks, jobsMap } = await getDashboardData();
    const progressPercent = Math.round((doneTasks / (allTasks.length || 1)) * 100);

    return (
        <div className="space-y-8">
            <section className="flex flex-col gap-6">
                <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">
                    Supervision de la Base
                </h2>

                <div className="relative overflow-hidden rounded-2xl border border-sky-900/50 bg-slate-900/60 p-8 backdrop-blur-md">
                    <div className="absolute left-0 top-0 h-1.5 w-full bg-slate-800">
                        <div
                            className="h-full bg-gradient-to-r from-sky-500 to-cyan-400 shadow-[0_0_20px_rgba(56,189,248,0.6)] transition-all duration-1000"
                            style={{ width: `${progressPercent}%` }}
                        />
                    </div>
                    <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                        <div>
                            <p className="text-sm font-bold uppercase tracking-widest text-sky-500/80">Progression Globale</p>
                            <h3 className="mt-1 text-5xl font-black text-white">{progressPercent}%</h3>
                        </div>
                        <div className="text-left md:text-right">
                            <p className="text-lg font-bold text-sky-400">{doneTasks} objectifs validés</p>
                            <p className="font-medium text-slate-500">sur {allTasks.length} au total</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard label="Pals Assignés" value={allSlots.filter(s => s.assignedTo).length} total={allSlots.length} icon="👥" />
                <StatCard label="Pals Terminés" value={doneSlots} total={allSlots.length} icon="✨" />
                <StatCard label="En Reproduction" value={allSlots.filter(s => s.status === 'breeding').length} icon="🥚" />
                <StatCard label="Passifs Validés" value={allSlots.filter(s => s.status === 'passives_ready').length} icon="🧬" />
            </section>

            <section>
                <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 lg:p-8">
                    <h3 className="mb-6 flex items-center gap-3 text-xl font-bold text-white">
                        <span className="text-sky-400">⚡</span> Répartition par spécialité
                    </h3>
                    <JobsGrid jobsMap={jobsMap} totalSlots={allSlots.length} />
                </div>
            </section>
        </div>
    );
}