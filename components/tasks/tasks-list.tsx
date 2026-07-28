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

    const toggleTask = async (task: Task) => {
        setLoadingId(task.id);
        try {
            const res = await fetch("/api/tasks", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: task.id,
                    done: !task.done,
                    userName: "Mario", // Idéalement, à récupérer depuis un contexte utilisateur
                }),
            });

            if (res.ok) {
                router.refresh(); // Recharge les données serveur (Server Actions)
            }
        } catch (error) {
            console.error("Erreur lors de la mise à jour :", error);
        } finally {
            setLoadingId(null);
        }
    };

    return (
        <div className="grid gap-3">
            {tasks.map((task) => {
                const slot = slotMap.get((task as any).slotId);
                const isLoading = loadingId === task.id;

                return (
                    <div
                        key={task.id}
                        className={`rounded-2xl border p-4 transition-colors ${
                            task.done
                                ? "border-emerald-500/20 bg-emerald-950/20"
                                : "border-zinc-800 bg-zinc-900 hover:border-zinc-700"
                        }`}
                    >
                        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                            <div>
                                <p className={`font-semibold ${task.done ? "text-zinc-500 line-through" : "text-white"}`}>
                                    {task.label}
                                </p>
                                <p className="text-sm text-zinc-400">
                                    {slot?.palName ?? "Pal inconnu"} • {slot?.targetJob ?? "-"}
                                </p>
                            </div>

                            <button
                                onClick={() => toggleTask(task)}
                                disabled={isLoading}
                                className={`rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                                    isLoading ? "opacity-50 cursor-not-allowed" : ""
                                } ${
                                    task.done
                                        ? "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                                        : "bg-primary text-primary-foreground hover:opacity-90"
                                }`}
                            >
                                {isLoading ? "Mise à jour..." : task.done ? "Annuler" : "Marquer comme fait"}
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}