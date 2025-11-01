<script>
  import { link } from 'svelte-spa-router';
  export let logoUrl = "";
</script>

<header class="bg-light py-3 mb-4 border-bottom">
  <div class="container d-flex justify-content-between align-items-center">
    <div class="d-flex align-items-center">
      <img src={logoUrl} alt="Festival Logo" width="60" class="me-3" />
      <div>
        <h1 class="h4 mb-0">Rock am See Festival</h1>
        <small class="text-muted">Teile deine Erfahrungen!</small>
      </div>
    </div>

    <a href="#/form" use:link class="btn btn-outline-primary">
      Neue Bewertung schreiben
    </a>
  </div>
</header>
