<!-- Header.svelte -->
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

  <!-- دکمه رفتن به فرم -->
  <a href="#/form" class="btn btn-outline-primary" use:link>
    Neue Bewertung schreiben
  </a>
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
    color: #007bff;
    background: white;
    text-decoration: none;
    margin-top: 10px;
  }

  .btn:hover {
    background: #007bff;
    color: white;
  }
</style>
