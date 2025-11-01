<script>
  import { reviews } from './stores.js';
  import { onMount } from 'svelte';
  export let params;

  let review;

  onMount(() => {
    $reviews.forEach(r => {
      if (r.id == params.id) review = r;
    });
  });
</script>

{#if review}
  <div class="container mt-4">
    <h2>{review.title}</h2>
    <p><strong>Von:</strong> {review.username}</p>
    <p><strong>Bewertung:</strong> {review.rating}★</p>
    <p>{review.text}</p>
  </div>
{:else}
  <p>Bewertung nicht gefunden.</p>
{/if}
