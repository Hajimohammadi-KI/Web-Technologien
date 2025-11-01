<script>
  
import Card from './Card.svelte';
import { writable } from 'svelte/store';

export const reviewsStore = writable([
  // Example review objects
  {
    username: 'Alice',
    rating: 5,
    title: 'Great event!',
    review: 'Had an amazing time at Rock am See.'
  },
  {
    username: 'Bob',
    rating: 4,
    title: 'Good vibes',
    review: 'Enjoyed the music and atmosphere.'
  }
]);
  // Auto-subscription with $
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
