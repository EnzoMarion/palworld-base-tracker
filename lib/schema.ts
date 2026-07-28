import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const projects = sqliteTable("projects", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    targetSize: integer("target_size").notNull().default(50),
    createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
});

export const slots = sqliteTable("slots", {
    id: text("id").primaryKey(),
    projectId: text("project_id").notNull(),
    palName: text("pal_name").notNull(),
    targetJob: text("target_job").notNull(),
    status: text("status").notNull().default("planned"),
    targetPassives: text("target_passives", { mode: "json" }).$type<string[]>().notNull(),
    currentPassives: text("current_passives", { mode: "json" }).$type<string[]>().notNull(),
    targetBooks: text("target_books", { mode: "json" }).$type<string[]>().notNull(),
    currentBooks: text("current_books", { mode: "json" }).$type<string[]>().notNull(),
    assignedTo: text("assigned_to"),
    notes: text("notes"),
    createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp_ms" }).notNull(),
});

export const tasks = sqliteTable("tasks", {
    id: text("id").primaryKey(),
    slotId: text("slot_id").notNull(),
    label: text("label").notNull(),
    type: text("type").notNull(),
    done: integer("done", { mode: "boolean" }).notNull().default(false),
    createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
});

export const activityLog = sqliteTable("activity_log", {
    id: text("id").primaryKey(),
    projectId: text("project_id").notNull(),
    userName: text("user_name").notNull(),
    action: text("action").notNull(),
    entityType: text("entity_type").notNull(),
    entityId: text("entity_id").notNull(),
    createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
});