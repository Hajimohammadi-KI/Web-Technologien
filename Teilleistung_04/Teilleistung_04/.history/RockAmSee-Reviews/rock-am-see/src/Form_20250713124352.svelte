<script>
  import { reviews } from './stores.js';
  import { push } from 'svelte-spa-router';

  let username = '';
  let rating = 1;
  let title = '';
  let text = '';

  function submitForm() {
    if (username.length > 30 || title.length > 30 || text.length > 250) {
      alert('Eingabe ist zu lang!');
      return;
    }
    if (rating < 1 || rating > 5) {
      alert('Bewertung muss zwischen 1 und 5 liegen');
      return;
    }

    const newReview = {
      username,
      rating,
      title,
      text,
      id: Date.now()
    };

    reviews.update(all => [newReview, ...all]);
    push('/');
  }
</script>

<div class="container py-5">
  <div class="card shadow-lg mx-auto p-4" style="max-width: 600px;">
    <h4 class="mb-4 text-center">📝 Erfahrungsbericht verfassen</h4>

    <form on:submit|preventDefault={submitForm}>
      <div class="mb-3">
        <label for="username" class="form-label">👤 Username</label>
        <input id="username" class="form-control" bind:value={username} maxlength="30" placeholder="Dein Name" />
      </div>

      <div class="mb-3">
        <label for="rating" class="form-label">⭐ Rating (1–5)</label>
        <input id="rating" type="number" class="form-control" min="1" max="5" bind:value={rating} />
      </div>

      <div class="mb-3">
        <label for="title" class="form-label">🏷️ Titel</label>
        <input id="title" class="form-control" bind:value={title} maxlength="30" placeholder="Titel des Berichts" />
      </div>

      <div class="mb-3">
        <label for="report" class="form-label">🗒️ Bericht</label>
        <textarea id="report" class="form-control" rows="4" maxlength="250" bind:value={text} placeholder="Dein Bericht"></textarea>
      </div>

      <button class="btn btn-primary w-100" type="submit">✅ Abschicken</button>
    </form>
  </div>
</div>
