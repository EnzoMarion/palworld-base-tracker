"use client";

import { useState } from "react";
import { EditSlotForm } from "./edit-slot-sheet";

type Pal = {
    id: string;
    palName: string;
    targetJob: string;
    status: string;
    assignedTo: string | null;
    currentPassives: string[];
    targetPassives: string[];
    currentBooks: string[];
    targetBooks: string[];
};

// Dictionnaire de traduction
const statusTranslations: Record<string, string> = {
    planned: "Planifié",
    breeding: "En reproduction",
    captured: "Capturé",
    passives_ready: "Passifs OK",
    books_ready: "Livres OK",
    fully_done: "Terminé à 100%"
};

// Couleurs par statut
function getStatusColor(status: string) {
    switch (status) {
        case "fully_done": return "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30";
        case "books_ready": return "bg-blue-500/15 text-blue-300 border border-blue-500/30";
        case "passives_ready": return "bg-purple-500/15 text-purple-300 border border-purple-500/30";
        case "captured": return "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30";
        case "breeding": return "bg-amber-500/15 text-amber-300 border border-amber-500/30";
        default: return "bg-slate-800 text-slate-300 border border-slate-700";
    }
}

export function PalsTable({ pals }: { pals: Pal[] }) {
    const [editingPal, setEditingPal] = useState<Pal | null>(null);

    return (
        <>
            <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900">
                <table className="w-full text-left text-sm">
                    <thead className="border-b border-slate-800 bg-slate-950">
                    <tr>
                        <th className="px-4 py-3 font-medium text-slate-400">Nom</th>
                        <th className="px-4 py-3 font-medium text-slate-400">Métier</th>
                        <th className="px-4 py-3 font-medium text-slate-400">Statut</th>
                        <th className="px-4 py-3 font-medium text-slate-400">Assigné</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                    {pals.map((pal) => (
                        <tr
                            key={pal.id}
                            onClick={() => setEditingPal(pal)}
                            className="cursor-pointer hover:bg-slate-800/50 transition-colors"
                        >
                            <td className="px-4 py-3 font-medium text-white">{pal.palName}</td>
                            <td className="px-4 py-3 text-slate-300">{pal.targetJob}</td>
                            <td className="px-4 py-3">
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(pal.status)}`}>
                    {/* On utilise le dictionnaire pour afficher en français */}
                      {statusTranslations[pal.status] || pal.status}
                  </span>
                            </td>
                            <td className="px-4 py-3 text-slate-300">{pal.assignedTo ?? "-"}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Le popup de modification qui s'ouvre au clic */}
            {editingPal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="w-full max-w-md">
                        <EditSlotForm pal={editingPal} onClose={() => setEditingPal(null)} />
                    </div>
                </div>
            )}
        </>
    );
}