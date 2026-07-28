"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Task = {
    id: string;
    label: string;
    done: boolean;
};

export function TasksList({ tasks, slotMap }: { tasks: Task[], slotMap: Map<string, any> }) {
    const router = useRouter();
    const [loadingId, setLoadingId] = useState<string | null>(null);

    // Nouvel état pour le filtre de recherche
    const [searchQuery, setSearchQuery] = useState("");

    const toggleTask = async (task: Task) => {
        setLoadingId(task.id);
        try {
            const currentUser = localStorage.getItem("palworld_user") || "Akame";

            const res = await fetch("/api/tasks", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: task.id,
                    done: !task.done,
                    userName: currentUser,
                }),
            });

            if (res.ok) {
                router.refresh();
            }
        } catch (error) {
            console.error("Erreur lors de la mise à jour :", error);
        } finally {
            setLoadingId(null);
        }
    };

    // On filtre les tâches dynamiquement en fonction du texte tapé
    const filteredTasks = tasks.filter((task) => {
        if (!searchQuery) return true;

        const slot = slotMap.get((task as any).slotId);
        const palName = slot?.palName?.toLowerCase() || "";

        return palName.includes(searchQuery.toLowerCase());
    });

    return (
        <div>
            {/* Barre de recherche */}
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="🔍 Filtrer par nom de Pal (ex: Mimog #1)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full cursor-text rounded-xl border border-slate-800 bg-slate-900 p-4 text-white outline-none transition-colors placeholder:text-slate-500 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                />
            </div>

            <div className="grid gap-3">
                {filteredTasks.length === 0 ? (
                    <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-8 text-center text-slate-400">
                        Aucune tâche trouvée pour "{searchQuery}"
                    </div>
                ) : (
                    filteredTasks.map((task) => {
                        const slot = slotMap.get((task as any).slotId);
                        const isLoading = loadingId === task.id;

                        return (
                            <div
                                key={task.id}
                                className={`rounded-2xl border p-5 transition-all ${
                                    task.done
                                        ? "border-emerald-500/20 bg-emerald-950/10 opacity-70"
                                        : "border-slate-800 bg-slate-900/80 hover:border-sky-900/50"
                                }`}
                            >
                                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                                    <div className="flex-1 space-y-2">
                                        <p className={`text-lg font-bold ${task.done ? "text-slate-500 line-through" : "text-white"}`}>
                                            {task.label}
                                        </p>
                                        <p className="text-sm font-medium text-slate-400">
                                            <span className="text-sky-400">{slot?.palName ?? "Pal inconnu"}</span> • {slot?.targetJob ?? "-"}
                                        </p>

                                        {/* Affichage des passifs */}
                                        {slot?.targetPassives && slot.targetPassives.length > 0 && (
                                            <div className="flex flex-wrap items-center gap-2 pt-1">
                                                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Objectif :</span>
                                                {slot.targetPassives.map((passive: string) => (
                                                    <span key={passive} className={`rounded-md px-2 py-1 text-xs font-medium ${task.done ? "bg-slate-800 text-slate-500" : "bg-sky-950/50 text-sky-300 border border-sky-800/30"}`}>
                            {passive}
                          </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <button
                                        onClick={() => toggleTask(task)}
                                        disabled={isLoading}
                                        className={`shrink-0 rounded-xl px-5 py-2.5 text-sm font-bold transition-all ${
                                            isLoading ? "opacity-50 cursor-not-allowed" : ""
                                        } ${
                                            task.done
                                                ? "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white"
                                                : "bg-sky-500 text-white hover:bg-sky-400 shadow-[0_0_15px_rgba(14,165,233,0.3)]"
                                        }`}
                                    >
                                        {isLoading ? "..." : task.done ? "Annuler" : "Marquer comme fait"}
                                    </button>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}