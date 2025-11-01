<!-- src/App.svelte -->
<script>
  import { Router } from 'svelte-spa-router';
  import routes from './routes.js';
  import Header from './Header.svelte';
</script>

<main>
  <Header logoUrl="/img/LEGO.png" />
  <Router {routes} />
</main>
