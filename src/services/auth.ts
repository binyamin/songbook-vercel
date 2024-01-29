import { eq } from 'drizzle-orm';
import { Lucia, TimeSpan } from 'lucia';
import { LibSQLAdapter } from '@lucia-auth/adapter-sqlite';
import { Argon2id } from 'oslo/password';

import { client, db, schema } from '../../drizzle/index.js';

const adapter = new LibSQLAdapter(client, {
	user: 'user',
	session: 'session',
});

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		name: 'session',
		expires: false,
		attributes: {
			secure: import.meta.env.PROD,
		},
	},
	sessionExpiresIn: new TimeSpan(30, 'd'),
	getUserAttributes(user) {
		return {
			username: user.username,
		}
	},
});

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: {
			username: string;
		};
	}
}

export async function verify(username: string, password: string) {
	const list = await db.select().from(schema.user).where(eq(schema.user.username, username));

	const user = list[0];
	if (!user || !user.hashed_password) return false;

	const res = await new Argon2id().verify(user.hashed_password, password);
	if (res) {
		return user;
	} else  {
		return null;
	}
}
