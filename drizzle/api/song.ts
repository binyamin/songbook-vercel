import { eq } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-valibot';
import { nanoid } from 'nanoid';
import { type Input, omit, parse, safeParse } from 'valibot';

import { song as model, type Song } from '../models/index.ts';
import { db, schema } from '../index.ts';

export type { Song }

type ManyOptions = {
	/** @default 25 */
	limit?: number;
	/** @default 0 */
	offset?: number;
}

export async function findMany(options: ManyOptions = {}): Promise<Pick<Song, 'id' | 'title'>[]> {
	options.limit ??= 25;
	options.offset ??= 0;

	const list = await db
		.select({
			id: schema.song.id,
			title: schema.song.title,
		})
		.from(schema.song)
		.orderBy(schema.song.title)
		.limit(options.limit)
		.offset(options.offset)

	return list;
}

export async function findOne(id: string): Promise<Song | null> {
	const res = await db
		.select()
		.from(schema.song)
		.limit(1)
		.where(eq(schema.song.id, id))

	return res[0] ?? null;
}

export const inputSchema = omit(createInsertSchema(schema.song, model.entries), ['id']);
export type InputValue = Input<typeof inputSchema>;

export async function insert(input: InputValue): Promise<Song> {
	const data = parse(inputSchema, input);

	const res = await db
		.insert(schema.song)
		.values({ id: nanoid(), ...data, })
		.returning();

	return res[0];
}

export async function update(id: string, input: InputValue): Promise<Song> {
	const data = parse(inputSchema, input);

	const res = await db
		.update(schema.song)
		.set({
			...data,
			id,
		})
		.where(eq(schema.song.id, id))
		.returning();

	return res[0];
}

export async function remove(id: string): Promise<boolean> {
	const res = await db
		.delete(schema.song)
		.where(eq(schema.song.id, id))
		.returning();

	return res.length > 0;
}
