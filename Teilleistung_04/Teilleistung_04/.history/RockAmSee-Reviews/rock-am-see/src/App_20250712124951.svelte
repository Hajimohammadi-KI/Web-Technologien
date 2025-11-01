<script>
  import Header from './Header.svelte';
  import { Router } from 'svelte-spa-router';
  import routes from './routes.js';
</script>

<Header logoUrl="/img/LEGO.png" />
<Router {routes} />
