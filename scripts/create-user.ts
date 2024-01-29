import util from 'node:util';

import { LibsqlError } from '@libsql/client';
import chalk from 'chalk';
import { generateId } from 'lucia';
import { Argon2id } from 'oslo/password';
import { db, schema } from '../drizzle/index';

import { lucia } from '~/services/auth.js';

function fatal(msg: unknown, ...rest: unknown[]): never {
	console.error(chalk.red('error') + ':', util.format(msg, ...rest));
	process.exit(64);
}

function info(msg: unknown, ...rest: unknown[]) {
	console.info(chalk.cyan('info') + ':', util.format(msg, ...rest));
}

if (!('Bun' in globalThis)) {
	fatal('This file should be run with Bun');
}

const username = prompt('Please enter a username:');
if (!username) fatal('Username must be provided');

const password = prompt('Please enter a password:');
if (!password) fatal('Password must be provided');

try {
	const user = await db
		.insert(schema.user)
		.values({
			id: generateId(15),
			username,
			hashed_password: await new Argon2id().hash(password),
		})
		.returning();

	info('Create user "%s"', user[0].username);
} catch (e) {
	if (e instanceof LibsqlError) {
		if (e.code === 'SQLITE_CONSTRAINT_UNIQUE') {
			fatal('[libsql]', 'Username already exists');
		}
	}

	// provided user attributes violates database rules (e.g. unique constraint)
	// or unexpected database errors
	throw e;
}
