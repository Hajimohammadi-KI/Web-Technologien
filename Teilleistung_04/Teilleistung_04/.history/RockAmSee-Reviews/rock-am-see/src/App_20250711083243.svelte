<script>
  // Den Store aus der stores.js importieren
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

    // Validierung des Ratings
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

    // Den neuen
