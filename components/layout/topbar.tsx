export function Topbar() {
    return (
        <header className="border-b border-zinc-800 bg-zinc-950/80 px-6 py-4 backdrop-blur">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-zinc-400">Projet partagé</p>
                    <h1 className="text-2xl font-bold text-white">Suivi de la base</h1>
                </div>
                <div className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm text-zinc-300">
                    Mario + équipe
                </div>
            </div>
        </header>
    );
}