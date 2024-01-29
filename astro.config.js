import { defineConfig } from 'astro/config';
import solid from '@astrojs/solid-js';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
	integrations: [
		solid(),
	],
	output: 'server',
	adapter: vercel(),
	server: {
		port: 3000,
	},
	build: {
		inlineStylesheets: 'never',
	},
	vite: {
		optimizeDeps: {
			exclude: ['oslo'],
		},
	},
});
