<script>
  import  Router  from 'svelte-spa-router';
  import routes from './routes.js';
  import Header from './Header.svelte';
</script>

<main>
  <Header logoUrl="/img/LEGO.png" />
  <Router {routes} />
</main>
<style>
  main {
    padding: 20px;
    max-width: 800px;
    margin: auto;
  }
  </style>
