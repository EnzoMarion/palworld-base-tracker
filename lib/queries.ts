import { desc } from "drizzle-orm";
import { db } from "./db";
import { activityLog, slots, tasks } from "./schema";

export async function getDashboardData() {
    const [allSlots, allTasks, allActivity] = await Promise.all([
        db.select().from(slots),
        db.select().from(tasks),
        db.select().from(activityLog).orderBy(desc(activityLog.createdAt)),
    ]);

    const doneSlots = allSlots.filter((slot) => slot.status === "fully_done").length;
    const doneTasks = allTasks.filter((task) => task.done).length;

    const jobsMap = allSlots.reduce<Record<string, number>>((acc, slot) => {
        acc[slot.targetJob] = (acc[slot.targetJob] ?? 0) + 1;
        return acc;
    }, {});

    return {
        allSlots,
        allTasks,
        allActivity,
        doneSlots,
        doneTasks,
        jobsMap,
    };
}

export async function getAllSlots() {
    return db.select().from(slots);
}

export async function getAllTasks() {
    return db.select().from(tasks);
}

export async function getActivity() {
    return db.select().from(activityLog).orderBy(desc(activityLog.createdAt));
}