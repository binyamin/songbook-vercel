import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	schema: './drizzle/schema.js',
	out: './drizzle/migrations',
});
