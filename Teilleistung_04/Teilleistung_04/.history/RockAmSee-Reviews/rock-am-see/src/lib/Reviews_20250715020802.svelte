<script>
  import { reviewsStore } from '../stores.js';
  import Card from './Card.svelte';

  $: reviews = $reviewsStore;
</script>

<div class="row">
  {#each reviews as review (review.id)}
    <div class="col-md-6 mb-4">
      <Card
        username={review.username}
        rating={review.rating}
        title={review.title}
        review={review.review}
      />
    </div>
  {/each}
</div>
