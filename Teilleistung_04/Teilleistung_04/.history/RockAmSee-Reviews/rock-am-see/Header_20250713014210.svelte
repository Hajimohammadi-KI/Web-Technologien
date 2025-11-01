
<script>
  export let logoUrl = "";
  import { link } from 'svelte-spa-router';

</script>

<header>
  <img src={logoUrl} alt="Festival Logo" width="100" />
  <h1>Rock am See Festival</h1>
  <h2>Teile deine Erfahrungen!</h2>

  <a href="#/new" use:link class="btn btn-outline-primary">Neue Bewertung schreiben</a>

</header>

<style>
  header {
    padding: 20px;
    background-color: #f8f9fa;
    border-bottom: 2px solid #dee2e6;
    text-align: center;
  }

  img {
    display: block;
    margin: 0 auto 10px auto;
  }
</style>
