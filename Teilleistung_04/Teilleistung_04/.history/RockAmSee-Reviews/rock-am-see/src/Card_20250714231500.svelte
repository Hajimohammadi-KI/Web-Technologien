<!-- Card.svelte - Individual review card component -->
<script>
  // Props using Svelte 5 syntax
  let { review } = $props();
  
  // Generate star display based on rating
  function generateStars(rating) {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push({
        filled: i <= rating,
        index: i
      });
    }
    return stars;
  }
  
  // Format timestamp for display
  function formatDate(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }
  
  $: stars = generateStars(review.rating);
</script>

<div class="review-card">
  <!-- Card Header with username and rating -->
  <div class="card-header">
    <div class="user-info">
      <div class="user-avatar">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="2"/>
          <circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2"/>
        </svg>
      </div>
      <span class="username">{review.username}</span>
    </div>
    
    <div class="rating-display">
      {#each stars as star}
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          class="star {star.filled ? 'filled' : 'empty'}"
        >
          <path 
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" 
            fill={star.filled ? '#FFD700' : '#e9ecef'}
            stroke={star.filled ? '#FFC107' : '#dee2e6'}
            stroke-width="1"
          />
        </svg>
      {/each}
    </div>
  </div>
  
  <!-- Card Body with title and review text -->
  <div class="card-body">
    <h5 class="review-title">{review.title}</h5>
    <p class="review-text">{review.review}</p>
  </div>
  
  <!-- Card Footer with timestamp -->
  <div class="card-footer">
    <small class="timestamp">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" class="me-1">
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
        <polyline points="12,6 12,12 16,14" stroke="currentColor" stroke-width="2"/>
      </svg>
      {formatDate(review.timestamp)}
    </small>
  </div>
</div>

<style>
  .review-card {
    background: white;
    border-radius: 15px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    overflow: hidden;
    height: 300px; /* Fixed height as required */
    display: flex;
    flex-direction: column;
    border: 1px solid rgba(255, 215, 0, 0.2);
  }
  
  .review-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
    border-color: rgba(255, 215, 0, 0.4);
  }
  
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.25rem 0.75rem;
    background: linear-gradient(135deg, rgba(255, 107, 53, 0.1) 0%, rgba(255, 215, 0, 0.1) 100%);
    border-bottom: 1px solid rgba(255, 215, 0, 0.2);
  }
  
  .user-info {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  
  .user-avatar {
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, #FF6B35 0%, #FFD700 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    flex-shrink: 0;
  }
  
  .username {
    font-weight: 600;
    color: #333;
    font-size: 1rem;
    max-width: 120px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  
  .rating-display {
    display: flex;
    gap: 2px;
    flex-shrink: 0;
  }
  
  .star {
    transition: all 0.2s ease;
  }
  
  .star.filled {
    filter: drop-shadow(0 2px 4px rgba(255, 193, 7, 0.3));
  }
  
  .card-body {
    padding: 1.25rem;
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  
  .review-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: #FF6B35;
    margin-bottom: 0.75rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  
  .review-text {
    color: #555;
    line-height: 1.6;
    margin-bottom: 0;
    flex: 1;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 6; /* Limit to 6 lines */
    -webkit-box-orient: vertical;
    font-size: 0.95rem;
  }
  
  .card-footer {
    padding: 0.75rem 1.25rem;
    background: rgba(248, 249, 250, 0.8);
    border-top: 1px solid rgba(0, 0, 0, 0.05);
  }
  
  .timestamp {
    color: #6c757d;
    font-size: 0.875rem;
    display: flex;
    align-items: center;
  }
  
  /* Responsive adjustments */
  @media (max-width: 768px) {
    .review-card {
      height: 280px;
    }
    
    .card-header {
      padding: 0.75rem 1rem 0.5rem;
    }
    
    .card-body {
      padding: 1rem;
    }
    
    .card-footer {
      padding: 0.5rem 1rem;
    }
    
    .username {
      max-width: 100px;
      font-size: 0.9rem;
    }
    
    .review-title {
      font-size: 1.1rem;
    }
    
    .review-text {
      font-size: 0.9rem;
      -webkit-line-clamp: 5;
    }
    
    .rating-display .star {
      width: 18px;
      height: 18px;
    }
  }
  
  @media (max-width: 576px) {
    .review-card {
      height: 260px;
    }
    
    .user-avatar {
      width: 35px;
      height: 35px;
    }
    
    .username {
      max-width: 80px;
      font-size: 0.85rem;
    }
    
    .review-title {
      font-size: 1rem;
    }
    
    .review-text {
      font-size: 0.85rem;
      -webkit-line-clamp: 4;
    }
    
    .rating-display .star {
      width: 16px;
      height: 16px;
    }
  }
</style>