<!-- src/Header.svelte -->
<script>
  export let logoUrl = "";
</script>

<header>
  <img src={logoUrl} alt="Festival Logo" width="100" />
  <h1>Rock am See Festival</h1>
  <h2>Teile deine Erfahrungen!</h2>
</header>
