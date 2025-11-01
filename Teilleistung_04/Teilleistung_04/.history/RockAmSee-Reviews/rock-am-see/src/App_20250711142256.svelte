<script>
  // Header und Form importieren
  import Header from './Header.svelte';
  import Form from './Form.svelte';
</script>

<main>
  <!-- Header mit Logo -->
  <Header logoUrl="/img/LEGO.png" />

  <!-- Formular -->
  <Form />
</main>

<style>
  main {
    padding: 2rem;
    font-family: Arial, sans-serif;
    max-width: 800px;
    margin: 0 auto;
  }
</style>
