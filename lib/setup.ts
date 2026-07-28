import "../scripts/load-env";

async function main() {
  const { client } = await import("./db");

  await client.execute(`
    CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      target_size INTEGER NOT NULL DEFAULT 50,
      created_at INTEGER NOT NULL
    );
  `);

  await client.execute(`
    CREATE TABLE IF NOT EXISTS slots (
      id TEXT PRIMARY KEY,
      project_id TEXT NOT NULL,
      pal_name TEXT NOT NULL,
      target_job TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'planned',
      target_passives TEXT NOT NULL,
      current_passives TEXT NOT NULL,
      target_books TEXT NOT NULL,
      current_books TEXT NOT NULL,
      assigned_to TEXT,
      notes TEXT,
      created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL
    );
  `);

  await client.execute(`
    CREATE TABLE IF NOT EXISTS tasks (
      id TEXT PRIMARY KEY,
      slot_id TEXT NOT NULL,
      label TEXT NOT NULL,
      type TEXT NOT NULL,
      done INTEGER NOT NULL DEFAULT 0,
      created_at INTEGER NOT NULL
    );
  `);

  await client.execute(`
    CREATE TABLE IF NOT EXISTS activity_log (
      id TEXT PRIMARY KEY,
      project_id TEXT NOT NULL,
      user_name TEXT NOT NULL,
      action TEXT NOT NULL,
      entity_type TEXT NOT NULL,
      entity_id TEXT NOT NULL,
      created_at INTEGER NOT NULL
    );
  `);

  console.log("Tables créées");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});