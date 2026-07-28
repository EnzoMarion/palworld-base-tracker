import { db } from "@/lib/db";
import { activityLog, tasks } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

export async function GET() {
    const data = await db.select().from(tasks);
    return NextResponse.json(data);
}

export async function PATCH(req: Request) {
    const body = await req.json();
    const now = new Date();

    await db.update(tasks).set({ done: body.done }).where(eq(tasks.id, body.id));

    await db.insert(activityLog).values({
        id: randomUUID(),
        projectId: body.projectId ?? "main-base",
        userName: body.userName ?? "Unknown",
        action: `Tâche ${body.done ? "terminée" : "réouverte"} : ${body.label}`,
        entityType: "task",
        entityId: body.id,
        createdAt: now,
    });

    return NextResponse.json({ ok: true });
}