<script>
  import Header from './Header.svelte';
  import { Router } from 'svelte-spa-router';
  import routes from './routes.js';
</script>
<main class="container mt-4">
  <h1>Rock am See Reviews</h1>
  <p>Willkommen zu den Bewertungen des Rock am See Festivals!</p>
<Header logoUrl="/img/LEGO.png" />
<Router {routes} />
</main>
