// vite.config.js

// Importiert die Vite-Konfigurationsfunktion
import { defineConfig } from 'vite';

// Importiert das Svelte-Plugin für Vite
import { svelte } from '@sveltejs/vite-plugin-svelte';

// Exportiert die Vite-Konfiguration
export default defineConfig({
  // Fügt das Svelte-Plugin zur Vite-Build-Pipeline hinzu
  plugins: [svelte()]
});
