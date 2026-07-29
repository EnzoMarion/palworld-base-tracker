import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import * as schema from './schema';

const client = createClient({
    // On ajoute un faux lien de secours juste pour tromper le compilateur de Vercel
    url: process.env.TURSO_DATABASE_URL || "https://dummy.turso.io",
    authToken: process.env.TURSO_AUTH_TOKEN || "dummy-token",
});

export const db = drizzle(client, { schema });
