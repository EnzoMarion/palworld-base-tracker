import { getAllTasks, getAllSlots } from "@/lib/queries";
import { TasksList } from "@/components/tasks/tasks-list";

export default async function TasksPage() {
    const [allTasks, allSlots] = await Promise.all([getAllTasks(), getAllSlots()]);

    // On crée une map pour lier facilement la tâche à son Pal
    const slotMap = new Map(allSlots.map((slot) => [slot.id, slot]));

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold text-white">Tâches</h2>
                <p className="mt-2 text-zinc-400">
                    Suivi des objectifs pour clôturer le projet de base.
                </p>
            </div>

            {/* On passe les données au composant Client */}
            <TasksList tasks={allTasks} slotMap={slotMap} />
        </div>
    );
}