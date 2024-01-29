import { sqliteTable, text, int } from 'drizzle-orm/sqlite-core';

export const user = sqliteTable('user', {
	id: text('id', { length: 15 }).notNull().primaryKey(),
	username: text('username').notNull().unique(),
	hashed_password: text('hashed_password', { length: 255 }),
});

export const session = sqliteTable('session', {
	id: text('id', { length: 127 }).notNull().primaryKey(),
	user_id: text('user_id', { length: 15 }).notNull().references(() => user.id),
	expires_at: int('expires_at').notNull(),
});

export const song = sqliteTable('song', {
	id: text('id').notNull().primaryKey(),
	title: text('title').notNull(),
	// key: text('key'),
	content: text('content').notNull(),
});
