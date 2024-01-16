import { type Input, minLength, object, string } from 'valibot';
import { _nanoid } from './helpers.ts';

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
