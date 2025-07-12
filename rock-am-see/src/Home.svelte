<!-- src/Home.svelte -->
<script>
  import { reviews } from './stores.js';
  import Card from './Card.svelte';
</script>

<h3 class="mt-4 mb-3">Alle Erfahrungsberichte</h3>

{#if $reviews.length > 0}
  {#each $reviews as review (review.id)}
    <Card {review} />
  {/each}
{:else}
  <p>Keine Bewertungen vorhanden.</p>
{/if}

<style>
  h3 {
    text-align: center;
  }
</style>
