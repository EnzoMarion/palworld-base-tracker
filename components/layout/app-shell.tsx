import { ReactNode } from "react";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";

export function AppShell({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 md:flex">
            <Sidebar />
            <div className="flex min-h-screen flex-1 flex-col">
                <Topbar />
                <main className="flex-1 p-6">{children}</main>
            </div>
        </div>
    );
}