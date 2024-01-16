import harmony from '@evilmartians/harmony/base';
import jit from 'postcss-jit-props';

function scale(name, scale) {
	return Object.fromEntries(
		Object.entries(scale).map(
			([k, v]) => ['--color-' + name + '-' + k, v]
		),
	);
}

export default {
	plugins: [
		jit({
			...scale('accent', harmony.indigo),
			...scale('neutral', harmony.neutral),
			...scale('danger', harmony.red),
		}),
	],
}
