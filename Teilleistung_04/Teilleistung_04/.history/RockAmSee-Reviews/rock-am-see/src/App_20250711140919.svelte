<script>
  // Header و Form ایمپورت
  import Header from './Header.svelte';
  import Form from './Form.svelte'
  // @ts-ignore
  </script>

<main>
  <!-- Header با لوگو -->
<Header logoUrl="/img/LEGO.png" />

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
