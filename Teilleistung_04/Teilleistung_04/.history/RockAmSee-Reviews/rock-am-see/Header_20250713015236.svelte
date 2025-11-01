<!-- Header.svelte -->
<script>
  import { link } from 'svelte-spa-router';
  export let logoUrl = "";
</script>

<header>
  <a href="#/new" use:link class="btn btn-outline-primary">Neue Bewertung schreiben</a>

  <div class="logo-wrapper">
    <img src={logoUrl} alt="Festival Logo" />
    <div class="title-wrapper">
      <h1>Rock am See Festival</h1>
      <h2>Teile deine Erfahrungen!</h2>
    </div>
  </div>
</header>

<style>
  header {
    padding: 20px;
    background: transparent;
  }

  .logo-wrapper {
    display: flex;
    align-items: center;
  }

  .logo-wrapper img {
    width: 60px;
    height: auto;
    margin-right: 15px;
  }

  .title-wrapper h1 {
    margin: 0;
    font-size: 1.5rem;
  }

  .title-wrapper h2 {
    margin: 0;
    font-size: 1rem;
    color: #666;
  }

  .btn {
    display: inline-block;
    padding: 6px 12px;
    border: 1px solid #007bff;
    border-radius: 4px;
    text-decoration: none;
    color: #007bff;
    font-size: 0.9rem;
  }

  .btn:hover {
    background-color: #007bff;
    color: white;
  }
</style>
