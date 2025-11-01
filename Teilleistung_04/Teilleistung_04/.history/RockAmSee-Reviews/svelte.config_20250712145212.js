// svelte.config.js
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default {
  preprocess: vitePreprocess(),

  compilerOptions: {
    dev: true
  }
};
// This configuration file sets up Svelte with Vite, enabling preprocessing and development mode.