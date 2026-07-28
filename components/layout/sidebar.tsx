"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
    { href: "/", label: "Dashboard" },
    { href: "/pals", label: "Pals" },
    { href: "/jobs", label: "Métiers" },
    { href: "/tasks", label: "Tâches" },
    { href: "/activity", label: "Activité" },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-full border-b border-zinc-800 bg-zinc-950 md:w-64 md:border-b-0 md:border-r">
            <div className="p-6">
                <p className="text-sm text-zinc-400">Palworld Base Tracker</p>
                <h2 className="text-xl font-bold text-white">Base 50 Pals</h2>
            </div>

            <nav className="flex gap-2 overflow-x-auto px-4 pb-4 md:flex-col md:px-3">
                {links.map((link) => {
                    const active = pathname === link.href;
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`rounded-xl px-4 py-3 text-sm transition ${
                                active
                                    ? "bg-zinc-800 text-white"
                                    : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                            }`}
                        >
                            {link.label}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}