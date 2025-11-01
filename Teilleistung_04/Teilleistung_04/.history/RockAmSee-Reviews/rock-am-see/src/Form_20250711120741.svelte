<script>
  // Den Store aus stores.js importieren
  import { reviews } from './stores.js';

  // Lokale Variablen für die Formulareingaben
  let username = ''; // Benutzername
  let rating = 1;    // Bewertung (1-5)
  let title = '';    // Titel des Berichts
  let text = '';     // Text des Berichts

  // Funktion, die beim Absenden des Formulars ausgeführt wird
  function submitForm() {
    // Validierung der Länge der Eingabefelder
    if (username.length > 30 || title.length > 30 || text.length > 250) {
      alert('Eingabe ist zu lang!'); // Hinweis, falls zu viele Zeichen
      return; // Abbruch
    }

    // Validierung der Bewertung
    if (rating < 1 || rating > 5) {
      alert('Bewertung muss zwischen 1 und 5 liegen'); // Hinweis, falls Rating ungültig
      return; // Abbruch
    }

    // Neues Bericht-Objekt erstellen
    const newReview = {
      username,   // Benutzername
      rating,     // Bewertung
      title,      // Titel
      text,       // Bericht-Text
      id: Date.now() // Eindeutige ID (Zeitstempel)
    };

    // Neuen Bericht im Store speichern
    reviews.update(all => [newReview, ...all]);

    // Eingabefelder zurücksetzen
    username = '';
    rating = 1;
    title = '';
    text = '';
  }
</script>

<!-- Formular-Layout -->
<form on:submit|preventDefault={submitForm} class="mb-4">
  <div class="mb-2">
    <label>Username:</label>
    <input type="text" bind:value={username} maxlength="30" />
  </div>

  <div class="mb-2">
    <label>Rating (1-5):</label>
    <input type="number" min="1" max="5" bind:value={rating} />
  </div>

  <div class="mb-2">
    <label>Title:</label>
    <input type="text" bind:value={title} maxlength="30" />
  </div>

  <div class="mb-2">
    <label>Report:</label>
    <textarea bind:value={text} maxlength="250"></textarea>
  </div>

  <button type="submit">Submit</button>
</form>

<style>
  /* Basis-Design für das Formular */
  form {
    border: 1px solid #ccc;
    padding: 1rem;
    border-radius: 5px;
  }

  label {
    display: block;
    margin-bottom: 0.2rem;
  }

  input, textarea {
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
  }

  button {
    padding: 0.5rem 1rem;
  }
</style>
