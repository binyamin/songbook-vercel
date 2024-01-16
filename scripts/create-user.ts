import util from 'node:util';

import { LibsqlError } from '@libsql/client';
import chalk from 'chalk';
import { LuciaError } from 'lucia';

import { auth } from '~/services/auth.js';

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
	const user = await auth.createUser({
		key: {
			providerId: 'username',
			providerUserId: username,
			password,
		},
		attributes: {
			username,
		} // expects `Lucia.DatabaseUserAttributes`
	});
	info('Create user "%s"', user.username);
} catch (e) {
	if (e instanceof LuciaError && e.message === `AUTH_DUPLICATE_KEY_ID`) {
		// key already exists
		fatal('[lucia] Key already exists');
	}

	if (e instanceof LibsqlError) {
		if (e.code === 'SQLITE_CONSTRAINT_UNIQUE') {
			fatal('[libsql]', 'Username already exists');
		}
	}

	// provided user attributes violates database rules (e.g. unique constraint)
	// or unexpected database errors
	throw e;
}
