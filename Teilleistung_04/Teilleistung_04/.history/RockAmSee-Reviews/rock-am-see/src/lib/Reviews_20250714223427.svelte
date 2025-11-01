<!-- Reviews.svelte - Grid layout component for displaying all reviews -->
<script>
  import { reviewsStore } from './stores.js';
  import Card from './Card.svelte';
  
  // Get reviews from store - this will be reactive
  let reviews = $state([]);
  
  // Subscribe to store changes
  $effect(() => {
    const unsubscribe = reviewsStore.subscribe((storeReviews) => {
      reviews = storeReviews;
    });
    
    return unsubscribe;
  });
</script>

<section class="reviews-section py-5">
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h2 class="section-title text-center mb-5">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" class="me-2">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#FFD700" stroke="#FF6B35" stroke-width="1"/>
          </svg>
          Alle Erfahrungsberichte
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" class="ms-2">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#FFD700" stroke="#FF6B35" stroke-width="1"/>
          </svg>
        </h2>
        
        {#if reviews.length === 0}
          <!-- Empty state when no reviews exist -->
          <div class="empty-state text-center py-5">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" class="mb-3 empty-icon">
              <circle cx="12" cy="12" r="10" stroke="#e9ecef" stroke-width="2"/>
              <path d="M8 14s1.5 2 4 2 4-2 4-2" stroke="#e9ecef" stroke-width="2" fill="none"/>
              <line x1="9" y1="9" x2="9.01" y2="9" stroke="#e9ecef" stroke-width="2"/>
              <line x1="15" y1="9" x2="15.01" y2="9" stroke="#e9ecef" stroke-width="2"/>
            </svg>
            <h3 class="empty-title">Noch keine Berichte vorhanden</h3>
            <p class="empty-text">Sei der erste, der seine Erfahrungen mit dem Festival teilt!</p>
          </div>
        {:else}
          <!-- Grid layout for reviews (2 columns) -->
          <div class="reviews-grid">
            {#each reviews as review (review.id)}
              <Card {review} />
            {/each}
          </div>
          
          <!-- Reviews count -->
          <div class="reviews-count text-center mt-4">
            <span class="count-badge">
              {reviews.length} {reviews.length === 1 ? 'Bericht' : 'Berichte'}
            </span>
          </div>
        {/if}
      </div>
    </div>
  </div>
</section>

<style>
  .reviews-section {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(5px);
    min-height: 400px;
  }
  
  .section-title {
    color: white;
    font-weight: 700;
    font-size: 2.5rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .reviews-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
    margin-bottom: 2rem;
  }
  
  .empty-state {
    background: rgba(255, 255, 255, 0.9);
    border-radius: 20px;
    padding: 3rem 2rem;
    margin: 0 auto;
    max-width: 500px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }
  
  .empty-icon {
    opacity: 0.5;
  }
  
  .empty-title {
    color: #6c757d;
    font-weight: 600;
    margin-bottom: 1rem;
  }
  
  .empty-text {
    color: #868e96;
    margin-bottom: 0;
    font-size: 1.1rem;
  }
  
  .reviews-count {
    margin-top: 2rem;
  }
  
  .count-badge {
    background: linear-gradient(135deg, #FF6B35 0%, #FFD700 100%);
    color: white;
    padding: 0.5rem 1.5rem;
    border-radius: 50px;
    font-weight: 600;
    box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
  }
  
  /* Responsive design */
  @media (max-width: 992px) {
    .reviews-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
    
    .section-title {
      font-size: 2rem;
      flex-direction: column;
    }
    
    .section-title svg {
      margin: 0.5rem 0 !important;
    }
  }
  
  @media (max-width: 768px) {
    .reviews-grid {
      gap: 1rem;
    }
    
    .empty-state {
      padding: 2rem 1.5rem;
      margin: 0 1rem;
    }
    
    .section-title {
      font-size: 1.75rem;
    }
  }
  
  @media (max-width: 576px) {
    .section-title {
      font-size: 1.5rem;
    }
    
    .empty-state {
      padding: 1.5rem 1rem;
    }
  }
</style>