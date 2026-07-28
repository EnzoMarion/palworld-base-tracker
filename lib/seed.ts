import "../scripts/load-env";
import { randomUUID } from "crypto";

const now = new Date();
const projectId = "main-base";

// Les trois groupes de passifs demandés
const passivesGroupe1 = ["Main du démon", "Maîtrise exceptionnelle", "Soumis", "Appliqué"];
const passivesGroupe2 = ["Main du démon", "Maîtrise exceptionnelle", "Nocturne", "Appliqué"];
const passivesMimog = ["Nocturne", "Coursier", "Sprinter", "Vif"];

const roster = [
    ...Array.from({ length: 7 }, (_, i) => ({
        palName: `Mimog #${i + 1}`,
        targetJob: "Transport",
        targetBooks: ["Transport 10"],
        targetPassives: passivesMimog,
    })),
    ...Array.from({ length: 6 }, (_, i) => ({
        palName: `Katress Ignis Feu #${i + 1}`,
        targetJob: "Feu",
        targetBooks: ["Feu 10"],
        targetPassives: passivesGroupe1,
    })),
    ...Array.from({ length: 4 }, (_, i) => ({
        palName: `Katress Ignis Pharma #${i + 1}`,
        targetJob: "Pharmacie",
        targetBooks: ["Pharmacie 10"],
        targetPassives: passivesGroupe1,
    })),
    ...Array.from({ length: 3 }, (_, i) => ({
        palName: `Shroomer Noct #${i + 1}`,
        targetJob: "Abattage",
        targetBooks: ["Abattage 10"],
        targetPassives: passivesGroupe1,
    })),
    ...Array.from({ length: 2 }, (_, i) => ({
        palName: `Dazzi Noct #${i + 1}`,
        targetJob: "Énergie",
        targetBooks: ["Énergie 10"],
        targetPassives: passivesGroupe1,
    })),
    {
        palName: "Jelliette #1",
        targetJob: "Arrosage",
        targetBooks: ["Arrosage 10"],
        targetPassives: passivesGroupe1,
    },
    ...Array.from({ length: 4 }, (_, i) => ({
        palName: `Jellroy #${i + 1}`,
        targetJob: "Arrosage",
        targetBooks: ["Arrosage 10"],
        targetPassives: passivesGroupe1,
    })),
    ...Array.from({ length: 3 }, (_, i) => ({
        palName: `Smokie Cryst #${i + 1}`,
        targetJob: "Réfrigération",
        targetBooks: ["Réfrigération 10"],
        targetPassives: passivesGroupe1,
    })),
    ...Array.from({ length: 2 }, (_, i) => ({
        palName: `Lullu #${i + 1}`,
        targetJob: "Semence",
        targetBooks: ["Semence 10"],
        targetPassives: passivesGroupe2,
    })),
    ...Array.from({ length: 2 }, (_, i) => ({
        palName: `Prunelia #${i + 1}`,
        targetJob: "Collecte",
        targetBooks: ["Collecte 10"],
        targetPassives: passivesGroupe1,
    })),
    ...Array.from({ length: 3 }, (_, i) => ({
        palName: `Sekhmet Alpha #${i + 1}`,
        targetJob: "Artisanat",
        targetBooks: ["Artisanat 10"],
        targetPassives: passivesGroupe2,
    })),
    ...Array.from({ length: 13 }, (_, i) => ({
        palName: `Anubis #${i + 1}`,
        targetJob: "Extraction",
        targetBooks: ["Extraction 10"],
        targetPassives: passivesGroupe2,
    })),
];

async function main() {
    const { db } = await import("./db");
    const { activityLog, projects, slots, tasks } = await import("./schema");

    await db.delete(activityLog);
    await db.delete(tasks);
    await db.delete(slots);
    await db.delete(projects);

    await db.insert(projects).values({
        id: projectId,
        name: "Base Palworld 50 Pals",
        targetSize: 50,
        createdAt: now,
    });

    for (const pal of roster) {
        const slotId = randomUUID();
        await db.insert(slots).values({
            id: slotId,
            projectId,
            palName: pal.palName,
            targetJob: pal.targetJob,
            status: "planned",
            targetPassives: pal.targetPassives,
            currentPassives: [],
            targetBooks: pal.targetBooks,
            currentBooks: [],
            assignedTo: null,
            notes: "",
            createdAt: now,
            updatedAt: now,
        });

        await db.insert(tasks).values([
            { id: randomUUID(), slotId, label: "Avoir le Pal", type: "capture", done: false, createdAt: now },
            { id: randomUUID(), slotId, label: "Avoir les bons passifs", type: "passive", done: false, createdAt: now },
            { id: randomUUID(), slotId, label: "Avoir les livres requis", type: "book", done: false, createdAt: now },
            // On a modifié le label juste ici :
            { id: randomUUID(), slotId, label: "Pal terminé full Âme", type: "done", done: false, createdAt: now },
        ]);
    }

    await db.insert(activityLog).values({
        id: randomUUID(),
        projectId,
        userName: "Akame",
        action: "Initialisation du projet",
        entityType: "project",
        entityId: projectId,
        createdAt: now,
    });

    console.log("Seed terminé avec succès !");
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});