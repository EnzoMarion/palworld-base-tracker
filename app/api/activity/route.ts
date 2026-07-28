import { db } from "@/lib/db";
import { activityLog } from "@/lib/schema";
import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
    const data = await db
        .select()
        .from(activityLog)
        .orderBy(desc(activityLog.createdAt));

    return NextResponse.json(data);
}