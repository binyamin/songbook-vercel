import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const song = sqliteTable('song', {
	id: text('id').notNull().primaryKey(),
	title: text('title').notNull(),
	// key: text('key'),
	content: text('content').notNull(),
});
