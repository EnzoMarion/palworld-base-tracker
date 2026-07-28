import "./globals.css";
import { AppShell } from "@/components/layout/app-shell";

// LA LIGNE MAGIQUE QUI SAUVE LE BUILD
export const dynamic = "force-dynamic";

export const metadata = {
    title: "Palworld Base Tracker",
    description: "Suivi collaboratif de la base",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr">
        <body>
        <AppShell>{children}</AppShell>
        </body>
        </html>
    );
}