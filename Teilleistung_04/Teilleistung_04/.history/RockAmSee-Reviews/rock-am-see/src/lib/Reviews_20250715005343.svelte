<script>
  import { reviewsStore } from '../../stores.js';
  import Card from './Card.svelte';

  // Use Svelte's $ syntax for auto-subscription
  $: reviews = $reviewsStore;
</script>

<div class="row">
  {#each reviews as review}
    <div class="col-md-6">
      <Card
        username={review.username}
        rating={review.rating}
        title={review.title}
        review={review.review}
      />
    </div>
  {/each}
</div>
