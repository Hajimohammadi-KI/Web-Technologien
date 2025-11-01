// svelte.config.js

// Vite Preprocessor für Svelte importieren
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default {
  // Preprocessor aktivieren
  preprocess: vitePreprocess(),

  // Compiler-Optionen (z. B. Entwicklermodus)
  compilerOptions: {
    dev: true
  }
};
