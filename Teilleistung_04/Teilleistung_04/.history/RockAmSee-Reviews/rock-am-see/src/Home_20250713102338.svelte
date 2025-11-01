<script>
  import { reviews } from './stores.js';
  import Card from './Card.svelte';
</script>

<div class="container">
  <h3 class="text-center my-4">Alle Erfahrungsberichte</h3>

  {#if $reviews.length > 0}
    <div class="row gy-3">
      {#each $reviews as review (review.id)}
        <div class="col-md-6">
          <Card {review} />
        </div>
      {/each}
    </div>
  {:else}
    <p class="text-center text-muted">Keine Bewertungen vorhanden.</p>
  {/if}
</div>
