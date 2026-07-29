import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import * as schema from './schema';

// C'est ICI qu'il manquait le mot "export" !
export const client = createClient({
    url: process.env.TURSO_DATABASE_URL || "https://dummy.turso.io",
    authToken: process.env.TURSO_AUTH_TOKEN || "dummy-token",
});

export const db = drizzle(client, { schema });
