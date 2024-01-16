import 'dotenv/config';

import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { migrate } from 'drizzle-orm/libsql/migrator';

import * as schema from './schema.ts';
export { schema }

export const client = createClient({
	fetch,
	url: process.env.DATABASE_URL!,
	authToken: process.env.DATABASE_AUTH_TOKEN,
});

await client.execute('PRAGMA journal_mode = WAL;');

export const db = drizzle(client, { schema });

await migrate(db, { migrationsFolder: './drizzle/migrations' });
