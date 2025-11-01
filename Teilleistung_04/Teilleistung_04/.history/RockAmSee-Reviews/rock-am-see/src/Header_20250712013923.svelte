<!-- Header.svelte -->
<script>
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
    width: 60px; /* Kleines Logo */
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
</style>
