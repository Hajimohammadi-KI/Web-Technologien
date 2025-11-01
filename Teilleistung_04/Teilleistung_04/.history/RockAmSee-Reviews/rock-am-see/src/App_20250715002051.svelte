<script>
  // Importiere die Komponenten
  import Header from './Header.svelte';
  import Form from './Form.svelte';
  import Reviews from './Reviews.svelte';
</script>

<!-- Hauptlayout der Anwendung -->
<main class="container py-4">
  <!-- Kopfbereich mit Logo, Überschrift und Untertitel -->
  <Header />

  <!-- Formular für Erfahrungsberichte -->
  <section class="my-5">
    <Form />
  </section>

  <!-- Bereich zur Anzeige aller Reviews -->
  <section class="my-5">
    <Reviews />
  </section>
</main>
