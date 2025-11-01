<!-- Form.svelte - Form component for submitting new reviews -->
<script>
  import { reviewsStore } from './stores.js';
  
  // Reactive form state using Svelte 5 syntax
  let username = $state('');
  let rating = $state(5);
  let title = $state('');
  let review = $state('');
  
  // Error states for validation
  let errors = $state({
    username: '',
    rating: '',
    title: '',
    review: ''
  });
  
  // Validation function
  function validateForm() {
    const newErrors = {
      username: '',
      rating: '',
      title: '',
      review: ''
    };
    
    let isValid = true;
    
    // Username validation (max 30 characters)
    if (!username.trim()) {
      newErrors.username = 'Nutzername ist erforderlich';
      isValid = false;
    } else if (username.length > 30) {
      newErrors.username = 'Nutzername darf maximal 30 Zeichen haben';
      isValid = false;
    }
    
    // Rating validation (1-5)
    if (rating < 1 || rating > 5) {
      newErrors.rating = 'Bewertung muss zwischen 1 und 5 sein';
      isValid = false;
    }
    
    // Title validation (max 30 characters)
    if (!title.trim()) {
      newErrors.title = 'Titel ist erforderlich';
      isValid = false;
    } else if (title.length > 30) {
      newErrors.title = 'Titel darf maximal 30 Zeichen haben';
      isValid = false;
    }
    
    // Review validation (max 250 characters)
    if (!review.trim()) {
      newErrors.review = 'Bericht ist erforderlich';
      isValid = false;
    } else if (review.length > 250) {
      newErrors.review = 'Bericht darf maximal 250 Zeichen haben';
      isValid = false;
    }
    
    errors = newErrors;
    return isValid;
  }
  
  // Form submission handler
  function handleSubmit(event) {
    event.preventDefault();
    
    if (validateForm()) {
      // Create review object
      const newReview = {
        id: Date.now(), // Simple ID generation
        username: username.trim(),
        rating: parseInt(rating),
        title: title.trim(),
        review: review.trim(),
        timestamp: new Date().toISOString()
      };
      
      // Add to store
      reviewsStore.addReview(newReview);
      
      // Reset form
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
      
      // Show success message
      alert('Bericht erfolgreich gesendet!');
    }
  }
</script>

<section class="form-section py-5">
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-8">
        <div class="form-card">
          <h2 class="form-title mb-4">Deine Erfahrungen</h2>
          
          <form on:submit={handleSubmit}>
            <div class="row">
              <!-- Username Input -->
              <div class="col-md-6 mb-3">
                <label for="username" class="form-label">Nutzername</label>
                <input 
                  type="text" 
                  class="form-control {errors.username ? 'is-invalid' : ''}"
                  id="username"
                  bind:value={username}
                  maxlength="30"
                  placeholder="Dein Name"
                />
                <div class="character-count">
                  {username.length}/30
                </div>
                {#if errors.username}
                  <div class="invalid-feedback">{errors.username}</div>
                {/if}
              </div>
              
              <!-- Rating Input -->
              <div class="col-md-6 mb-3">
                <label for="rating" class="form-label">Rating</label>
                <select 
                  class="form-select {errors.rating ? 'is-invalid' : ''}"
                  id="rating"
                  bind:value={rating}
                >
                  <option value={1}>⭐ 1 Stern</option>
                  <option value={2}>⭐⭐ 2 Sterne</option>
                  <option value={3}>⭐⭐⭐ 3 Sterne</option>
                  <option value={4}>⭐⭐⭐⭐ 4 Sterne</option>
                  <option value={5}>⭐⭐⭐⭐⭐ 5 Sterne</option>
                </select>
                {#if errors.rating}
                  <div class="invalid-feedback">{errors.rating}</div>
                {/if}
              </div>
            </div>
            
            <!-- Title Input -->
            <div class="mb-3">
              <label for="title" class="form-label">Titel</label>
              <input 
                type="text" 
                class="form-control {errors.title ? 'is-invalid' : ''}"
                id="title"
                bind:value={title}
                maxlength="30"
                placeholder="Titel deines Berichts"
              />
              <div class="character-count">
                {title.length}/30
              </div>
              {#if errors.title}
                <div class="invalid-feedback">{errors.title}</div>
              {/if}
            </div>
            
            <!-- Review Textarea -->
            <div class="mb-4">
              <label for="review" class="form-label">Bericht</label>
              <textarea 
                class="form-control {errors.review ? 'is-invalid' : ''}"
                id="review"
                rows="4"
                bind:value={review}
                maxlength="250"
                placeholder="Erzähle uns von deinen Erfahrungen beim Festival..."
              ></textarea>
              <div class="character-count">
                {review.length}/250
              </div>
              {#if errors.review}
                <div class="invalid-feedback">{errors.review}</div>
              {/if}
            </div>
            
            <!-- Submit Button -->
            <div class="text-center">
              <button type="submit" class="btn btn-primary btn-lg submit-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" class="me-2">
                  <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z" stroke="currentColor" stroke-width="2" fill="none"/>
                  <path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="2" fill="none"/>
                </svg>
                Bericht senden
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .form-section {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
  }
  
  .form-card {
    background: white;
    border-radius: 20px;
    padding: 2rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
  
  .form-title {
    color: #FF6B35;
    font-weight: 700;
    text-align: center;
    margin-bottom: 1.5rem;
  }
  
  .form-label {
    font-weight: 600;
    color: #333;
    margin-bottom: 0.5rem;
  }
  
  .form-control, .form-select {
    border-radius: 10px;
    border: 2px solid #e9ecef;
    padding: 0.75rem 1rem;
    transition: all 0.3s ease;
  }
  
  .form-control:focus, .form-select:focus {
    border-color: #FFD700;
    box-shadow: 0 0 0 0.2rem rgba(255, 215, 0, 0.25);
  }
  
  .character-count {
    font-size: 0.875rem;
    color: #6c757d;
    text-align: right;
    margin-top: 0.25rem;
  }
  
  .submit-btn {
    background: linear-gradient(135deg, #FF6B35 0%, #FFD700 100%);
    border: none;
    border-radius: 50px;
    padding: 1rem 3rem;
    font-weight: 600;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
  }
  
  .submit-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255, 107, 53, 0.3);
  }
  
  .invalid-feedback {
    display: block;
  }
  
  @media (max-width: 768px) {
    .form-card {
      padding: 1.5rem;
      margin: 0 1rem;
    }
    
    .submit-btn {
      width: 100%;
      justify-content: center;
    }
  }
</style>