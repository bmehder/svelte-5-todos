import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'
import purge from '@erbelion/vite-plugin-sveltekit-purgecss'

export default defineConfig({
	plugins: [sveltekit(), purge()],
})
