import { resolve } from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		tanstackRouter({ routesDirectory: './src/routes', target: 'react' }),
		react(),
		tailwindcss(),
	],
	resolve: {
		alias: {
			'@': resolve(__dirname, 'src'),
		},
	},
});
