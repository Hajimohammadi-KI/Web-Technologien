<!-- App.svelte - Main application component -->
<script>
  import Header from './lib/Header.svelte';
  import Form from './lib/Form.svelte';
  import Reviews from './lib/Reviews.svelte';
  import 'bootstrap/dist/css/bootstrap.min.css';
</script>

<main class="container-fluid">
  <!-- Header component with festival logo, title and subtitle -->
  <Header />
  
  <!-- Form component for submitting new reviews -->
  <Form />
  
  <!-- Reviews component displaying all reviews in grid layout -->
  <Reviews />
</main>

<style>
  :global(body) {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
  
  main {
    padding: 0;
  }
</style>