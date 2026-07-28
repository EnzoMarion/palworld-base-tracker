"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type PalSlot = {
    id: string;
    palName: string;
    status: string;
    assignedTo: string | null;
};

export function EditSlotForm({ pal, onClose }: { pal: PalSlot; onClose: () => void }) {
    const router = useRouter();
    const [status, setStatus] = useState(pal.status);
    const [assignedTo, setAssignedTo] = useState(pal.assignedTo || "");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const res = await fetch("/api/slots", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: pal.id,
                    status,
                    assignedTo: assignedTo === "" ? null : assignedTo,
                    palName: pal.palName,
                    userName: "Mario",
                }),
            });

            if (res.ok) {
                router.refresh();
                onClose();
            }
        } catch (error) {
            console.error("Erreur de sauvegarde :", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-zinc-800 bg-zinc-950 p-6">
            <div>
                <h3 className="text-lg font-bold text-white">Modifier {pal.palName}</h3>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400">Statut</label>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-900 p-2.5 text-white outline-none focus:border-primary"
                >
                    <option value="planned">Planifié</option>
                    <option value="breeding">En reproduction</option>
                    <option value="captured">Capturé</option>
                    <option value="passives_ready">Passifs OK</option>
                    <option value="books_ready">Livres OK</option>
                    <option value="fully_done">Terminé à 100%</option>
                </select>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400">Assigné à</label>
                <input
                    type="text"
                    value={assignedTo}
                    onChange={(e) => setAssignedTo(e.target.value)}
                    placeholder="Ex: Mario, Enzo..."
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-900 p-2.5 text-white outline-none focus:border-primary"
                />
            </div>

            <div className="flex gap-2 pt-2">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 rounded-lg bg-white px-4 py-2 font-semibold text-black hover:bg-zinc-200 disabled:opacity-50"
                >
                    {isSubmitting ? "Enregistrement..." : "Sauvegarder"}
                </button>
                <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 rounded-lg bg-zinc-800 px-4 py-2 font-semibold text-white hover:bg-zinc-700"
                >
                    Annuler
                </button>
            </div>
        </form>
    );
}