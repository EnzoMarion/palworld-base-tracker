import { db } from "@/lib/db";
import { activityLog, slots } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

export async function GET() {
    const data = await db.select().from(slots);
    return NextResponse.json(data);
}

export async function PATCH(req: Request) {
    const body = await req.json();
    const now = new Date();

    await db
        .update(slots)
        .set({
            status: body.status,
            assignedTo: body.assignedTo,
            notes: body.notes,
            currentPassives: body.currentPassives,
            currentBooks: body.currentBooks,
            updatedAt: now,
        })
        .where(eq(slots.id, body.id));

    await db.insert(activityLog).values({
        id: randomUUID(),
        projectId: body.projectId ?? "main-base",
        userName: body.userName ?? "Unknown",
        action: `Mise à jour de ${body.palName}`,
        entityType: "slot",
        entityId: body.id,
        createdAt: now,
    });

    return NextResponse.json({ ok: true });
}