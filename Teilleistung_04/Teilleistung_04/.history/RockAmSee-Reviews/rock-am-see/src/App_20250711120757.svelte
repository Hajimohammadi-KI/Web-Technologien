<script>
  // Header-Komponente importieren
  import Header from './Header.svelte';

  // Form-Komponente importieren
  import Form from './Form.svelte';
</script>

<main>
  <!-- Header anzeigen (Logo + Titel) -->
  <Header logoUrl="/img/LEGO.png" />

  <!-- Formular anzeigen -->
  <Form />
</main>

<style>
  /* Grundlegendes Layout für die Seite */
  main {
    padding: 2rem;              /* Innenabstand */
    font-family: Arial, sans-serif;  /* Schriftart */
    max-width: 800px;           /* maximale Breite */
    margin: 0 auto;             /* zentriert auf der Seite */
  }
</style>
