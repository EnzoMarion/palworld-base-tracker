import { JobsGrid } from "@/components/dashboard/jobs-grid";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { StatCard } from "@/components/dashboard/stat-card";
import { getDashboardData } from "@/lib/queries";

export default async function Home() {
  const { allSlots, allTasks, allActivity, doneSlots, doneTasks, jobsMap } =
      await getDashboardData();

  return (
      <div className="space-y-8">
        <section>
          <h2 className="text-3xl font-bold text-white">Dashboard</h2>
          <p className="mt-2 text-zinc-400">
            Vue globale de l’avancement de votre base Palworld.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-4">
          <StatCard label="Pals total" value={allSlots.length} />
          <StatCard label="Pals terminés" value={doneSlots} />
          <StatCard label="Tâches faites" value={doneTasks} />
          <StatCard label="Tâches totales" value={allTasks.length} />
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h3 className="mb-4 text-xl font-semibold text-white">
              Répartition par métier
            </h3>
            <JobsGrid jobsMap={jobsMap} />
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h3 className="mb-4 text-xl font-semibold text-white">
              Activité récente
            </h3>
            <RecentActivity items={allActivity} />
          </div>
        </section>
      </div>
  );
}