import { lucia } from 'lucia';
import { astro } from 'lucia/middleware';
import { libsql } from '@lucia-auth/adapter-sqlite';

import { client } from '../../drizzle/index.js';

export const auth = lucia({
	env: import.meta.env.DEV ? "DEV" : "PROD",
	middleware: astro(),
	adapter: libsql(client, {
		user: "user",
		key: "user_key",
		session: "user_session",
	}),
	getUserAttributes(user) {
		return {
			username: user.username,
		}
	},
});

export type Auth = typeof auth;
