<script>
  import { reviewsStore } from '../stores.js';
  import Card from './Card.svelte';

  let reviews = [];
  $: reviewsStore.subscribe(value => reviews = value);
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
    }
    
    errors = newErrors;
    return isValid;
  }
  
  // Submit handler
  function handleSubmit(event) {
    event.preventDefault();
    
    if (validateForm()) {
      reviewsStore.addReview({
        username,
        rating,
        title,
        review
      });
      
      // Reset form fields
      username = '';
      rating = 5;
      title = '';
      review = '';
      errors = {
        username: '',
        rating: '',
        title: '',
        review: ''
      };
    }
  }