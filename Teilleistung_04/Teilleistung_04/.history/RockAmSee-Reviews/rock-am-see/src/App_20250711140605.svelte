<script>
  // Header و Form ایمپورت
  import Header from './Header.svelte';
  import Form from './Form.svelte';

  // اگر لوگو در src/assets است:
  import logo from '../public/img/LEGO.png';
</script>

<main>
  <!-- Header با لوگو -->
  <Header logoUrl={logo} />

  <!-- فرم ورودی -->
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
