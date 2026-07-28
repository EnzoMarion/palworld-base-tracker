"use client";

import { useState, useEffect } from "react";

const TEAM = ["Akame", "Evan", "Alithan"];

export function Topbar() {
    const [currentUser, setCurrentUser] = useState("Akame");

    useEffect(() => {
        const saved = localStorage.getItem("palworld_user");
        if (saved && TEAM.includes(saved)) {
            setCurrentUser(saved);
        }
    }, []);

    const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newUser = e.target.value;
        setCurrentUser(newUser);
        localStorage.setItem("palworld_user", newUser);
    };

    return (
        <header className="border-b border-sky-900/40 bg-slate-950/80 px-6 py-4 backdrop-blur-md">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-sky-400">Projet collaboratif</p>
                    <h1 className="text-2xl font-bold text-slate-100">Suivi de la Base</h1>
                </div>
                <div className="flex items-center gap-3">
                    <span className="hidden text-sm text-slate-400 md:inline">
                        Connecté en tant que :
                    </span>
                    <select
                        value={currentUser}
                        onChange={handleUserChange}
                        className="cursor-pointer rounded-xl border border-sky-800/50 bg-slate-900 px-4 py-2 text-sm font-bold text-sky-300 outline-none transition-colors hover:border-sky-500 focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
                    >
                        {TEAM.map((member) => (
                            <option key={member} value={member}>
                                {member}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </header>
    );
}