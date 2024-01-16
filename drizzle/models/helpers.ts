import { regex, type ErrorMessage } from 'valibot';

export function _nanoid(message: ErrorMessage = 'Invalid NanoID') {
	return regex(/^[a-z0-9_\-]{21}$/ui, message);
}

export function musical_key(message: ErrorMessage = 'Invalid key signature') {
	return regex(/^[A-G][b#]?m?$/u, message);
}
