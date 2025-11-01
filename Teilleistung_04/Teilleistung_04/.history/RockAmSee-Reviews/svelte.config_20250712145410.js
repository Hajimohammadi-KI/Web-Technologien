// svelte.config.js

// Importieren des Vite-Preprocessors für Svelte
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
// Importieren von Node.js Pfadmodul für Alias-Erstellung
import path from 'path';

export default {
  // Konfiguration der Preprozessoren (z. B. SCSS, PostCSS)
  preprocess: vitePreprocess({
    style: {
      // Automatisches Einfügen von SCSS-Variablen in allen Styles
      scss: {
        prependData: `@import 'src/styles/variables.scss';`
      },
      // Aktiviert PostCSS, falls verwendet
      postcss: true
    }
  }),

  // Compiler-Optionen für Svelte
  compilerOptions: {
    // Entwicklungsmodus aktivieren (zeigt z. B. Warnungen)
    dev: true
  },

  // Alias-Einstellungen (optional, für saubere Imports)
  kit: {
    alias: {
      // Beispielhafte Aliase (können angepasst oder entfernt werden)
      $components: path.resolve('./src/components'),
      $lib: path.resolve('./src/lib'),
      $styles: path.resolve('./src/styles')
    }
  }
};
// Diese Konfiguration ermöglicht es, Svelte-Komponenten und -Styles effizient zu verarbeiten