<script>
  import { reviews } from './stores.js';
  import { Router, link } from 'svelte-spa-router';
</script>

<!-- لیست نظرات -->
<div class="container mt-5">
  <h2 class="mb-4">Alle Erfahrungsberichte</h2>

  {#if $reviews.length > 0}
    {#each $reviews as review}
      <a href={"/review/" + review.id} class="text-decoration-none text-dark">
        <div class="card mb-3 shadow-sm p-3">
          <h5>{review.title}</h5>
          <p><strong>{review.username}</strong> – {review.rating}★</p>
          <p>{review.text.slice(0, 100)}...</p>
        </div>
      </a>
    {/each}
  {:else}
    <p>Keine Bewertungen vorhanden.</p>
  {/if}
</div>

<style>
  .container {
    max-width: 700px;
    margin: auto;
  }
</style>
