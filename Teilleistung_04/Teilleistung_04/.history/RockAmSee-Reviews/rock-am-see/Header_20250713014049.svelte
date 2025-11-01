<script>
  import { link } from 'svelte-spa-router';
  export let logoUrl = "";
</script>

<header>
  <div class="logo-wrapper">
    <img src={logoUrl} alt="Festival Logo" />
    <div class="title-wrapper">
      <h1>Rock am See Festival</h1>
      <h2>Teile deine Erfahrungen!</h2>
    </div>
  </div>

  <a href="#/new" use:link class="btn btn-outline-primary">Neue Bewertung schreiben</a>
</header>
