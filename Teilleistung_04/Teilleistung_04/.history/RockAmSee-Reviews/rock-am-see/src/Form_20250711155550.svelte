<script>
  import { reviews } from './stores.js';

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

    username = '';
    rating = 1;
    title = '';
    text = '';
  }
</script>

<form on:submit|preventDefault={submitForm} class="card p-4 shadow-sm mx-auto" style="max-width: 400px;">
  <h5 class="mb-3">Erfahrungsbericht verfassen</h5>

  <div class="mb-3">
    <label class="form-label" for="username">Username</label>
    <input id="username" type="text" class="form-control" bind:value={username} maxlength="30" placeholder="Dein Name" />
  </div>

  <div class="mb-3">
    <label class="form-label" for="rating">Rating (1-5)</label>
    <input id="rating" type="number" class="form-control" min="1" max="5" bind:value={rating} />
  </div>

  <div class="mb-3">
    <label class="form-label" for="title">Title</label>
    <input id="title" type="text" class="form-control" bind:value={title} maxlength="30" placeholder="Titel des Berichts" />
  </div>

  <div class="mb-3">
    <label class="form-label" for="report">Report</label>
    <textarea id="report" class="form-control" bind:value={text} maxlength="250" rows="4" placeholder="Dein Bericht"></textarea>
  </div>

  <button type="submit" class="btn btn-primary">Abschicken</button>
</form>
