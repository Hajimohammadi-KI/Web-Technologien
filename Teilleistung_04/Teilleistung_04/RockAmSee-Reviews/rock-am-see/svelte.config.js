import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default {
  preprocess: vitePreprocess(),
  compilerOptions: {
    dev: true
  }
};
// This configuration file sets up Svelte with Vite for development
// It uses vitePreprocess for handling Svelte files and enables development mode