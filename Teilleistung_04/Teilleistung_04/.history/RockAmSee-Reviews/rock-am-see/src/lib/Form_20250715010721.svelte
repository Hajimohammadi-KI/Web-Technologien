<script>
  // Importiere den Store für Bewertungen
  import { reviewsStore } from '../stores.js';

  // Lokale Zustände (reactive)
  let username = '';
  let rating = 5;
  let title = '';
  let review = '';

  // Fehlerobjekt für Validierung
  let errors = {
    username: '',
    rating: '',
    title: '',
    review: ''
  };

  // Validierungsfunktion für das Formular
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

  // Absenden-Handler
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

      // Neue Bewertung dem Store hinzufügen
      reviewsStore.update(current => [...current, newReview]);

      // Felder zurücksetzen
      username = '';
      rating = 5;
      title = '';
      review = '';
      errors = { username: '', rating: '', title: '', review: '' };

      alert('Bericht erfolgreich gespeichert!');
    }
  }
</script>

<!-- Formular -->
<form class="card p-4 shadow-custom bg-light" on:submit={handleSubmit}>
  <h3 class="mb-3">Erfahrungsbericht verfassen</h3>

  <!-- Benutzername -->
  <div class="mb-3">
    <label class="form-label">Benutzername</label>
    <input
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

  <!-- Bewertung -->
  <div class="mb-3">
    <label class="form-label">Bewertung (1–5 Sterne)</label>
    <select
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

  <!-- Titel -->
  <div class="mb-3">
    <label class="form-label">Titel</label>
    <input
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

  <!-- Bericht -->
  <div class="mb-3">
    <label class="form-label">Bericht</label>
    <textarea
      class={`form-control ${errors.review ? 'is-invalid' : ''}`}
      bind:value={review}
      maxlength="250"
      rows="4"
      placeholder="Max. 250 Zeichen">
    </textarea>
    {#if errors.review}
      <div class="invalid-feedback">{errors.review}</div>
    {/if}
  </div>

  <!-- Button -->
  <button type="submit" class="btn btn-primary w-100">
    Bericht senden
  </button>
</form>
