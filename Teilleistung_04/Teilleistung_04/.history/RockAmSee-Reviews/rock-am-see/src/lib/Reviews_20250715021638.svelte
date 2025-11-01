<script>
  import { reviewsStore } from '../stores.js';
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';

  // Optional: reactive reviews array
  let reviews = [];

  // Subscribe manually or use `$reviewsStore`
  $: reviews = $reviewsStore;
</script>

{#each reviews as review (review.id)}
  <div class="card p-3 mb-4 shadow-hover">
    <div class="d-flex justify-content-between align-items-center mb-2">
      <strong>{review.username}</strong>
      <div>
        {#each Array(5) as _, i}
          <i class="bi bi-star-fill" style="color: {i < review.rating ? 'gold' : 'lightgray'};"></i>
        {/each}
      </div>
    </div>
    <h5>{review.title}</h5>
    <p>{review.review}</p>
  </div>
{/each}
