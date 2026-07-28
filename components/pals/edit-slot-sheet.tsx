"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type PalSlot = {
    id: string;
    palName: string;
    status: string;
    assignedTo: string | null;
};

const TEAM = ["Akame", "Evan", "Alithan"];

export function EditSlotForm({ pal, onClose }: { pal: PalSlot; onClose: () => void }) {
    const router = useRouter();
    const [status, setStatus] = useState(pal.status);
    const [assignedTo, setAssignedTo] = useState(pal.assignedTo || "");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const currentUser = localStorage.getItem("palworld_user") || "Akame";

            const res = await fetch("/api/slots", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: pal.id,
                    status,
                    assignedTo: assignedTo === "" ? null : assignedTo,
                    palName: pal.palName,
                    userName: currentUser,
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
        <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-slate-800 bg-slate-950 p-6 shadow-2xl">
            <div>
                <h3 className="text-xl font-bold text-white">Modifier {pal.palName}</h3>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400">Statut</label>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full cursor-pointer rounded-xl border border-slate-800 bg-slate-900 p-3 text-white outline-none transition-colors focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
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
                <label className="text-sm font-medium text-slate-400">Assigné à</label>
                <select
                    value={assignedTo}
                    onChange={(e) => setAssignedTo(e.target.value)}
                    className="w-full cursor-pointer rounded-xl border border-slate-800 bg-slate-900 p-3 text-white outline-none transition-colors focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                >
                    <option value="">-- Non assigné --</option>
                    {TEAM.map((member) => (
                        <option key={member} value={member}>
                            {member}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex gap-3 pt-4">
                <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 rounded-xl bg-slate-800 px-4 py-2.5 font-bold text-white transition-colors hover:bg-slate-700"
                >
                    Annuler
                </button>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 rounded-xl bg-sky-500 px-4 py-2.5 font-bold text-white transition-all hover:bg-sky-400 hover:shadow-[0_0_15px_rgba(14,165,233,0.3)] disabled:opacity-50"
                >
                    {isSubmitting ? "Enregistrement..." : "Sauvegarder"}
                </button>
            </div>
        </form>
    );
}