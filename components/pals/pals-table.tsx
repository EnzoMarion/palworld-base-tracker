"use client";

import { useState } from "react";
import { EditSlotForm } from "./edit-slot-sheet";
import { Badge } from "@/components/ui/badge";

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

function getStatusColor(status: string) {
    switch (status) {
        case "fully_done": return "bg-emerald-500/15 text-emerald-300";
        case "books_ready": return "bg-blue-500/15 text-blue-300";
        case "passives_ready": return "bg-purple-500/15 text-purple-300";
        case "captured": return "bg-cyan-500/15 text-cyan-300";
        case "breeding": return "bg-amber-500/15 text-amber-300";
        default: return "bg-zinc-800 text-zinc-300";
    }
}

export function PalsTable({ pals }: { pals: Pal[] }) {
    const [editingPal, setEditingPal] = useState<Pal | null>(null);

    return (
        <>
            <div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-900">
                <table className="w-full text-left text-sm">
                    <thead className="border-b border-zinc-800 bg-zinc-950">
                    <tr>
                        <th className="px-4 py-3 font-medium text-zinc-400">Nom</th>
                        <th className="px-4 py-3 font-medium text-zinc-400">Métier</th>
                        <th className="px-4 py-3 font-medium text-zinc-400">Statut</th>
                        <th className="px-4 py-3 font-medium text-zinc-400">Assigné</th>
                        <th className="px-4 py-3 font-medium text-zinc-400 text-right">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800">
                    {pals.map((pal) => (
                        <tr key={pal.id} className="hover:bg-zinc-800/50 transition-colors">
                            <td className="px-4 py-3 font-medium text-white">{pal.palName}</td>
                            <td className="px-4 py-3 text-zinc-300">{pal.targetJob}</td>
                            <td className="px-4 py-3">
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(pal.status)}`}>
                    {pal.status}
                  </span>
                            </td>
                            <td className="px-4 py-3 text-zinc-300">{pal.assignedTo ?? "-"}</td>
                            <td className="px-4 py-3 text-right">
                                <button
                                    onClick={() => setEditingPal(pal)}
                                    className="text-primary hover:text-white transition-colors"
                                >
                                    Modifier
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Modal d'édition */}
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