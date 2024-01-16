import { migrate } from 'drizzle-orm/libsql/migrator';
import { db } from '../drizzle/index.js';

await migrate(db, { migrationsFolder: './drizzle/migrations' });
