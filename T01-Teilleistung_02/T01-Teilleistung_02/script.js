// =========================
//  (A) Referenzen auf die relevanten Elemente holen
// =========================

// 1) Überschriften (H2) jeder Sektion
const headingInformationenEl   = document.getElementById("heading-informationen");
const headingVeranstaltungenEl = document.getElementById("heading-veranstaltungen");
const headingHelferEl          = document.getElementById("heading-helfer");

// 2) Div-Container, die jeweils ein-/ausgeblendet werden
const informationenDetailsEl   = document.getElementById("informationen-details");
const veranstaltungenDetailsEl = document.getElementById("veranstaltungen-details");
const helferDetailsEl          = document.getElementById("helfer-details");

// 3) Link-Elemente in der Navigation (für automatisches Scrollen + Toggle)
const linkInformationenEl      = document.getElementById("link-informationen");
const linkVeranstaltungenEl    = document.getElementById("link-veranstaltungen");
const linkHelferEl             = document.getElementById("link-helfer");

// =========================
//  (B) Hilfsfunktionen zum Ein-/Ausblenden
// =========================

/**
 * hideAllSections:
 * Blendet alle Detail-Container aus, indem die Klasse "hidden" gesetzt wird.
 */
function hideAllSections() {
  informationenDetailsEl.classList.add("hidden");
  veranstaltungenDetailsEl.classList.add("hidden");
  helferDetailsEl.classList.add("hidden");
}

/**
 * showSection:
 * Blendet ausschließlich den übergebenen Detail-Container ein.
 * Zunächst werden alle Container ausgeblendet, dann wird das Ziel-Element sichtbar gemacht.
 */
function showSection(detailsEl) {
  hideAllSections();
  detailsEl.classList.remove("hidden");
}

// =========================
//  (C) Klick-Listener einrichten (Überschriften + Navi-Links)
// =========================

// (C.1) Klick auf H2 „Informationen“ → Details ein-/ausblenden (siehe showSection)
headingInformationenEl.addEventListener("click", () => {
  showSection(informationenDetailsEl);
});

// (C.2) Klick auf H2 „Veranstaltungen“ → Details ein-/ausblenden
headingVeranstaltungenEl.addEventListener("click", () => {
  showSection(veranstaltungenDetailsEl);
});

// (C.3) Klick auf H2 „Helfer:innen“ → Details ein-/ausblenden
headingHelferEl.addEventListener("click", () => {
  showSection(helferDetailsEl);
});

// (C.4) Klick auf Nav-Link „Festival-Organisation“ → scrollt automatisch per href und zeigt Details
linkInformationenEl.addEventListener("click", () => {
  showSection(informationenDetailsEl);
  // Browser führt href="#informationen" automatisch aus
});

// (C.5) Klick auf Nav-Link „Festival-Planung“ → zeigt Veranstaltungen-Details
linkVeranstaltungenEl.addEventListener("click", () => {
  showSection(veranstaltungenDetailsEl);
});

// (C.6) Klick auf Nav-Link „Festival-Durchführung“ → zeigt Helfer:innen-Details
linkHelferEl.addEventListener("click", () => {
  showSection(helferDetailsEl);
});

// =========================
//  (D) Abschnitt Countdown
// =========================

// 1) Festival-Startdatum festlegen (ISO-8601)
const targetDate = new Date("2025-07-05T12:00:00");

// 2) Element abrufen, in dem der Countdown angezeigt wird
const countdownTimerEl  = document.getElementById("countdown-timer");
let countdownIntervalId = null; // Speichert die Intervall-ID, um es später stoppen zu können

/**
 * calculateTimeDiff:
 * Berechnet den Zeitunterschied zwischen jetzt und dem Festival-Start.
 * Gibt { days, hours, minutes, seconds } zurück oder null, falls das Festival schon begonnen hat.
 */
function calculateTimeDiff() {
  const now  = new Date();
  const diff = targetDate - now; // Millisekunden-Differenz

  if (diff <= 0) {
    // Festival hat bereits begonnen
    return null;
  }

  const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours   = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds };
}

/**
 * updateCountdown:
 * Holt das aktuelle Zeit-Objekt von calculateTimeDiff und zeigt es an.
 * Ist das Festival gestartet, wird das Intervall gestoppt und eine Nachricht angezeigt.
 */
function updateCountdown() {
  const timeObj = calculateTimeDiff();

  if (!timeObj) {
    countdownTimerEl.textContent = "Das Festival hat begonnen!";
    stopCountdown();
    return;
  }

  const { days, hours, minutes, seconds } = timeObj;
  countdownTimerEl.textContent =
    `${days} Tage, ${hours} Stunden, ${minutes} Minuten, ${seconds} Sekunden`;
}

/**
 * startCountdown:
 * Führt sofort ein Update des Countdowns aus und startet danach
 * ein Intervall, das jede Sekunde updateCountdown aufruft.
 */
function startCountdown() {
  updateCountdown();
  countdownIntervalId = setInterval(updateCountdown, 1000);
}

/**
 * stopCountdown:
 * Löscht das laufende Intervall (falls gesetzt).
 */
function stopCountdown() {
  if (countdownIntervalId !== null) {
    clearInterval(countdownIntervalId);
    countdownIntervalId = null;
  }
}

// =========================
//  (E) Abschnitt Veranstaltungen anzeigen
// =========================

// Beispiel-Events als JavaScript-Objekte
const eventsData = [
  {
    id: 1,
    datum: "12.06.2025",
    uhrzeit: "14:00 Uhr",
    titel: "Eröffnungskonzert am Strand",
    beschreibung: "Musikalischer Auftakt mit der AC/DC-Revival-Band",
    anforderungen: "Mindestalter: 18, Erfahrung am Einlass"
  },
  {
    id: 2,
    datum: "13.06.2025",
    uhrzeit: "16:30 Uhr",
    titel: "Workshop: Band-Coaching",
    beschreibung: "Tipps und Tricks für aufstrebende Bands",
    anforderungen: "Mindestalter: 16, Instrument mitbringen"
  },
  {
    id: 3,
    datum: "14.06.2025",
    uhrzeit: "19:00 Uhr",
    titel: "Hauptact: Rockband XYZ",
    beschreibung: "Die Top-Band des Festivals live auf der Bühne",
    anforderungen: "Kein Zutritt für Kinder unter 12"
  },
  {
    id: 4,
    datum: "15.06.2025",
    uhrzeit: "12:00 Uhr",
    titel: "Abschluss-Open-Air",
    beschreibung: "Großes Abschlussevent mit lokalen Newcomern",
    anforderungen: "Freier Eintritt, alle sind willkommen"
  }
];

/**
 * displayEvents:
 * Erzeugt eine HTML-Tabelle aus eventsData und hängt sie in #events-container ein.
 */
function displayEvents() {
  const container = document.getElementById("events-container");
  container.innerHTML = ""; // Vorher leeren

  const table = document.createElement("table");
  table.classList.add("events-table"); // Für eigenes CSS-Styling

  // THEAD erstellen
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  ["Datum", "Uhrzeit", "Titel", "Anforderungen"].forEach(text => {
    const th = document.createElement("th");
    th.textContent = text;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // TBODY erstellen
  const tbody = document.createElement("tbody");
  eventsData.forEach(event => {
    const row = document.createElement("tr");

    // Datum
    const tdDatum = document.createElement("td");
    tdDatum.textContent = event.datum;
    row.appendChild(tdDatum);

    // Uhrzeit
    const tdUhrzeit = document.createElement("td");
    tdUhrzeit.textContent = event.uhrzeit;
    row.appendChild(tdUhrzeit);

    // Titel
    const tdTitel = document.createElement("td");
    tdTitel.textContent = event.titel;
    row.appendChild(tdTitel);

    // Anforderungen (Beschreibung + Anforderungen)
    const tdAnf = document.createElement("td");
    tdAnf.innerHTML = `${event.beschreibung}<br><em>${event.anforderungen}</em>`;
    row.appendChild(tdAnf);

    tbody.appendChild(row);
  });
  table.appendChild(tbody);

  container.appendChild(table);
}

// =========================
//  (F) Abschnitt Helfer:innen (Fetch, Sort, Anzeige)
// =========================

// 1) Elemente abrufen: Loader, Fehlermeldung, UL für Helfer:innen
const loaderEl     = document.getElementById("loader");
const errorEl      = document.getElementById("error");
const listEl       = document.getElementById("helper-list");

// 2) Select-Element zum Sortieren abrufen
const sortSelectEl = document.getElementById("sort-select");

// 3) Leeres Array für die Benutzer-Daten
let usersData = [];

/**
 * loadUsers:
 * Zeigt den Loader, blendet Fehlermeldung aus, ruft die API auf und speichert das Resultat in usersData.
 * Bei Erfolg: Loader verschwindet, usersData wird gefüllt (Anzeige erst beim Sortieren).
 * Bei Fehler: Loader verschwindet, Fehlermeldung wird sichtbar.
 */
function loadUsers() {
  loaderEl.hidden = false; // Loader anzeigen
  errorEl.hidden  = true;  // Fehlermeldung verstecken

  fetch("https://randomuser.me/api/?results=30&seed=a")
    .then(response => {
      if (!response.ok) {
        throw new Error("Server-Antwort nicht in Ordnung");
      }
      return response.json();
    })
    .then(data => {
      loaderEl.hidden = true;      // Loader ausblenden
      usersData = data.results;    // Array mit API-Ergebnissen füllen
      // Anzeige der Karten erfolgt erst via sortUsers()
    })
    .catch(err => {
      loaderEl.hidden = true;
      errorEl.hidden  = false;
      console.error("Fetch-Fehler:", err);
    });
}

/**
 * sortUsers:
 * Sortiert usersData je nach Wert des Select-Menüs
 * (Name auf-/absteigend oder Registrierungsdatum auf-/absteigend).
 * Ist der Wert "" (neutrale Option), wird die Liste geleert.
 * Anschließend wird displayUsers(usersData) aufgerufen.
 */
function sortUsers() {
  const sortValue = sortSelectEl.value;

  // Neutrale Auswahl: Liste leeren und zurück
  if (sortValue === "") {
    listEl.innerHTML = "";
    return;
  }

  // Sortierung für Name aufsteigend
  if (sortValue === "name-asc") {
    usersData.sort((a, b) => {
      const nameA = a.name.first.toLowerCase() + " " + a.name.last.toLowerCase();
      const nameB = b.name.first.toLowerCase() + " " + b.name.last.toLowerCase();
      return nameA.localeCompare(nameB);
    });
  }
  // Sortierung für Name absteigend
  else if (sortValue === "name-desc") {
    usersData.sort((a, b) => {
      const nameA = a.name.first.toLowerCase() + " " + a.name.last.toLowerCase();
      const nameB = b.name.first.toLowerCase() + " " + b.name.last.toLowerCase();
      return nameB.localeCompare(nameA);
    });
  }
  // Sortierung für Registrierungsdatum aufsteigend
  else if (sortValue === "registered-asc") {
    usersData.sort((a, b) => {
      return new Date(a.registered.date) - new Date(b.registered.date);
    });
  }
  // Sortierung für Registrierungsdatum absteigend
  else if (sortValue === "registered-desc") {
    usersData.sort((a, b) => {
      return new Date(b.registered.date) - new Date(a.registered.date);
    });
  }

  // Sortierte Helfer:innen anzeigen
  displayUsers(usersData);
}

/**
 * displayUsers:
 * Löscht die UL (#helper-list) und fügt für jeden Benutzer in arr
 * ein <li> mit der Karten-Struktur ein. Dann wird es an die UL angehängt.
 */
function displayUsers(arr) {
  listEl.innerHTML = ""; // Liste zuerst leeren

  arr.forEach(user => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div class="card">
        <img src="${user.picture.large}" alt="Bild ${user.name.first} ${user.name.last}">
        <h3>${user.name.first} ${user.name.last}</h3>
        <p>Geschlecht: ${user.gender}</p>
        <p>Email: ${user.email}</p>
        <p>Geboren: ${new Date(user.dob.date).toLocaleDateString("de-DE")}</p>
        <p>Registriert: ${new Date(user.registered.date).toLocaleDateString("de-DE")}</p>
        <p>Telefon: ${user.phone}</p>
        <p>Handy: ${user.cell}</p>
        <p>ID: ${user.id.value || "—"}</p>
      </div>
    `;
    listEl.appendChild(li);
  });
}

// =========================
//  (G) Funktion zum Initialisieren
// =========================

/**
 * initializeApp:
 *   1) startCountdown()       → Countdown starten
 *   2) displayEvents()        → Veranstaltungs-Tabelle (wird erst sichtbar, wenn der Container ent-hidden ist)
 *   3) loadUsers()            → Helfer:innen-Daten laden
 *   4) sortSelectEl.addEventListener("change", sortUsers) → Sortierung aktivieren
 *   (Toggle-Listener sind bereits oben konfiguriert.)
 */
function initializeApp() {
  startCountdown();
  displayEvents();
  loadUsers();
  sortSelectEl.addEventListener("change", sortUsers);
}

// Sobald das DOM komplett geladen ist, initializeApp ausführen
document.addEventListener("DOMContentLoaded", initializeApp);
