<script>
  import { reviewsStore } from '../stores.js';
    import Reviews from './Reviews.svelte';

  let username = '';
  let rating = 5;
  let title = '';
  let review = '';

  let errors = {
    username: '',
    rating: '',
    title: '',
    review: ''
  };

  function validateForm() {
    let valid = true;
    let newErrors = { username: '', rating: '', title: '', review: '' };

    if (!username.trim()) {
      newErrors.username = 'Benutzername ist erforderlich';
      valid = false;
    } else if (username.length > 30) {
      newErrors.username = 'Maximal 30 Zeichen erlaubt';
      valid = false;
    }

    if (!title.trim()) {
      newErrors.title = 'Titel ist erforderlich';
      valid = false;
    } else if (title.length > 30) {
      newErrors.title = 'Maximal 30 Zeichen erlaubt';
      valid = false;
    }

    if (!review.trim()) {
      newErrors.review = 'Bericht darf nicht leer sein';
      valid = false;
    } else if (review.length > 250) {
      newErrors.review = 'Maximal 250 Zeichen erlaubt';
      valid = false;
    }

    if (rating < 1 || rating > 5) {
      newErrors.rating = 'Bewertung muss zwischen 1 und 5 sein';
      valid = false;
    }

    errors = newErrors;
    return valid;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (validateForm()) {
      const newReview = {
        id: Date.now(),
        username: username.trim(),
        rating: Number(rating),
        title: title.trim(),
        review: review.trim(),
        timestamp: new Date().toISOString()
      };

      reviewsStore.update(current => [newReview, ...current]);

      username = '';
      rating = 5;
      title = '';
      review = '';
      errors = { username: '', rating: '', title: '', review: '' };

      alert('Bericht erfolgreich gespeichert!');
    }
  }
</script>

<form class="card p-4 shadow-custom bg-light" on:submit={handleSubmit}>
  <h3 class="mb-3">Erfahrungsbericht verfassen</h3>

  <div class="mb-3">
    <label class="form-label" for="username">Benutzername</label>
    <input
      id="username"
      type="text"
      class={`form-control ${errors.username ? 'is-invalid' : ''}`}
      bind:value={username}
      maxlength="30"
      placeholder="Max. 30 Zeichen"
    />
    {#if errors.username}
      <div class="invalid-feedback">{errors.username}</div>
    {/if}
  </div>

  <div class="mb-3">
    <label class="form-label" for="rating">Bewertung (1–5 Sterne)</label>
    <select
      id="rating"
      class={`form-select ${errors.rating ? 'is-invalid' : ''}`}
      bind:value={rating}>
      <option value={1}>⭐</option>
      <option value={2}>⭐⭐</option>
      <option value={3}>⭐⭐⭐</option>
      <option value={4}>⭐⭐⭐⭐</option>
      <option value={5}>⭐⭐⭐⭐⭐</option>
    </select>
    {#if errors.rating}
      <div class="invalid-feedback">{errors.rating}</div>
    {/if}
  </div>

  <div class="mb-3">
    <label class="form-label" for="title">Titel</label>
    <input
      id="title"
      type="text"
      class={`form-control ${errors.title ? 'is-invalid' : ''}`}
      bind:value={title}
      maxlength="30"
      placeholder="Titel der Erfahrung"
    />
    {#if errors.title}
      <div class="invalid-feedback">{errors.title}</div>
    {/if}
  </div>

  <div class="mb-3">
    <label class="form-label" for="review">Bericht</label>
    <textarea
      id="review"
      class={`form-control ${errors.review ? 'is-invalid' : ''}`}
      bind:value={}
      maxlength="250"
      rows="4"
      placeholder="Max. 250 Zeichen">
    </textarea>
    {#if errors.review}
      <div class="invalid-feedback">{errors.review}</div>
    {/if}
  </div>

  <button type="submit" class="btn btn-primary w-100">
    Bericht senden
  </button>
</form>
