"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
    { href: "/", label: "Dashboard" },
    { href: "/pals", label: "Pals" },
    { href: "/jobs", label: "Métiers" },
    { href: "/tasks", label: "Tâches" },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="flex h-full w-full shrink-0 flex-col border-b border-slate-800 bg-slate-950 md:w-64 md:border-b-0 md:border-r">
            <div className="p-6">
                <p className="text-sm font-medium text-sky-400">Palworld Base Tracker</p>
                <h2 className="text-xl font-black text-white tracking-wide">Base 50 Pals</h2>
            </div>
            <nav className="flex flex-1 gap-2 overflow-x-auto px-4 pb-4 md:flex-col md:px-3">
                {links.map((link) => {
                    const active = pathname === link.href;
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`rounded-xl px-4 py-3 text-sm font-bold transition-all ${
                                active
                                    ? "bg-sky-900/40 border border-sky-800/50 text-sky-300 shadow-sm"
                                    : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
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