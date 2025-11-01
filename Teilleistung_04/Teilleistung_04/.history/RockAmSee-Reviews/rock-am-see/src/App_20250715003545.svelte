<script>
  // Importiere die Komponenten
  import Header from './lib/Header.svelte';
  import Form from './lib/Form.svelte';
 import Reviews from './lib/Reviews.svelte';

</script>

<main class="container py-4">
  <Header />
  <section class="my-5">
    <Form />
  </section>
  <section class="my-5">
    <Reviews />
  </section>
</main>
