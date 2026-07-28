import { ReactNode } from "react";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";

export function AppShell({ children }: { children: ReactNode }) {
    return (
        <div className="flex h-screen overflow-hidden bg-slate-950 text-slate-100">
            <Sidebar />
            <div className="flex flex-1 flex-col overflow-y-auto">
                <Topbar />
                <main className="flex-1 p-6 lg:p-8">{children}</main>
            </div>
        </div>
    );
}