import { type Input, length, minLength, object, string, toLowerCase } from 'valibot';
import { _nanoid } from './helpers.ts';

export const user = object({
	id: string([length(15)]),
	username: string([
		minLength(1, 'Please enter your username'),
		toLowerCase(),
	]),
	password: string([
		minLength(1, 'Please enter your password'),
		minLength(8, 'Passwords must contain at least 8 characters'),
	]),
});

export type User = Input<typeof user>;

export const song = object({
	id: string([_nanoid()]),
	title: string([
		minLength(1, 'This field is required'),
	]),
	// key: string([musical_key()]),
	content: string([
		minLength(1, 'This field is required'),
	]),
});

export type Song = Input<typeof song>;
