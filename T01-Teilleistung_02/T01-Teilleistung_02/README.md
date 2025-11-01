# Festival-Organisation Webprojekt

Dieses Repository enthält eine Single-Page-Webanwendung zur Planung und Durchführung eines fiktiven Festivals. Die App bietet folgende Hauptfunktionen:

1. **Countdown** bis zum Festivalstart
2. **Aufklappbare Bereiche** für:

   * Festival-Organisation (Informationen)
   * Festival-Planung (Veranstaltungen)
   * Festival-Durchführung (Helfer\:innen)
3. **Dynamisch generierte Veranstaltungstabelle**
4. **Fetch-basierte Helfer\:innen-Liste** mit Sortierfunktion
5. **Responsive Design** für verschiedene Bildschirmgrößen

---

## Inhaltsverzeichnis

1. [Projektstruktur](#projektstruktur)
2. [Voraussetzungen](#voraussetzungen)
3. [Installation](#installation)
4. [Verwendete Technologien](#verwendete-technologien)
5. [Dateibeschreibung](#dateibeschreibung)
6. [Funktionaler Überblick](#funktionaler-überblick)
7. [Entwicklungsstand und To-Dos](#entwicklungsstand-und-to-dos)
8. [Lizenz](#lizenz)

---

## Projektstruktur

```
/festival-organisation
├─ index.html
├─ style.css
├─ script.js
└─ imag/
   └─ LEGO.png           (Festival-Logo)
```

* **index.html**
  Die Haupt-HTML-Datei, die die vier Sektionen (Countdown, Informationen, Veranstaltungen, Helfer\:innen) sowie die fixierte Navbar enthält.

* **style.css**
  Enthält alle CSS-Regeln für Layout, Farben, Flexbox-Strukturen, Responsive Anpassungen und Animationsklassen (z. B. `.hidden`).

* **script.js**
  JavaScript-Logik für:

  * Countdown-Berechnung
  * Toggle-Funktionalität (Informationen, Veranstaltungen, Helfer\:innen)
  * Dynamisches Erzeugen der Veranstaltungstabelle
  * Fetch-Aufruf und Sortierung der Helfer\:innen-Daten

* **imag/LEGO.png**
  Logo des Festivals, das in der fixierten Navigationsleiste angezeigt wird.

---

## Voraussetzungen

* Ein moderner Webbrowser (z. B. Chrome, Firefox, Edge oder Safari)
* (Optional) Ein einfacher HTTP-Server, um lokales CORS-Verhalten zu vermeiden (z. B. Live Server in VS Code oder Python SimpleHTTPServer)

---

## Installation

1. Repository klonen oder ZIP herunterladen und entpacken.
2. Sicherstellen, dass alle drei Dateien (`index.html`, `style.css`, `script.js`) sowie das Verzeichnis `imag/LEGO.png` im selben Ordner liegen.
3. `index.html` im Browser öffnen oder z. B. mit Live Server starten:

   ```bash
   cd /pfad/zum/projekt
   live-server
   ```

   Dadurch wird die Seite automatisch im Standardbrowser geladen.

---

## Verwendete Technologien

* **HTML5**
  Semantische Struktur mit `<section>`, `<h2>` etc.

* **CSS3**

  * Globales `box-sizing: border-box;`
  * Flexbox-Layout für Navbar und Container
  * Responsive Media Queries (max-width: 768px)
  * Farbverläufe für jede Sektion
  * `.hidden`-Klasse, um Elemente via `display: none;` ein-/auszublenden
  * Tabelle (`.events-table`) und Karten-Layout (`.card`)

* **JavaScript (ES6+)**

  * Countdown-Berechnung mit `Date` und `setInterval`
  * DOM-Manipulation: `getElementById`, `classList.toggle`, `createElement`
  * Fetch-API zum Laden von Helfer\:innen-Daten (randomuser.me)
  * Sortierlogik für Name und Registrierungsdatum
  * Klick-Listener für Header und Navbar-Links

---

## Dateibeschreibung

### `index.html`

* **Navbar** (fest positioniert oben):

  * Logo (`<img src="imag/LEGO.png">`)
  * vier Links mit `href="#countdown"`, `href="#informationen"`, `href="#veranstaltungen"`, `href="#helfer"`
  * Links haben IDs:

    * `link-countdown`
    * `link-informationen`
    * `link-veranstaltungen`
    * `link-helfer`

* **Spacer** (`<div class="spacer"></div>`)
  Verhindert, dass der fixierte Navbar-Bereich den Content überdeckt.

* **Vier Hauptsektionen** (`<section class="full-section">`):

  1. **Countdown**

     * `<h2 class="section-header">Countdown</h2>`
     * `<div id="countdown-timer">Loading …</div>`
  2. **Informationen**

     * `<h2 id="heading-informationen" class="section-header">Informationen</h2>`
     * `<div id="informationen-details" class="hidden">…Infos und organisatorische Details…</div>`
  3. **Veranstaltungen**

     * `<h2 id="heading-veranstaltungen" class="section-header">Veranstaltungen</h2>`
     * `<div id="veranstaltungen-details" class="hidden"><div id="events-container"></div></div>`
  4. **Helfer\:innen**

     * `<h2 id="heading-helfer" class="section-header">Helfer:innen</h2>`
     * `<div id="helfer-details" class="hidden">…Loader, Fehlermeldung, Sort-Dropdown, `<ul id="helper-list">`…</div>`

### `style.css`

* **Globales Box-Sizing**:

  ```css
  *, *::before, *::after { box-sizing: border-box; }
  ```

* **.hidden-Klasse**:

  ```css
  .hidden { display: none; }
  ```

* **Navbar-Stile**:

  ```css
  .navbar {
    position: fixed;
    top: 0; left: 0; right: 0;
    margin: 1rem auto;
    max-width: 90%;
    padding: 0.5rem 1rem;
    background-color: rgba(210,221,231,0.9);
    border: 2px solid #333;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    z-index: 1000;
  }
  .logo-container { margin-right: 1rem; }
  .logo { max-height: 50px; width: auto; }
  .nav-list {
    list-style: none;
    margin: 0; padding: 0;
    display: flex;
    gap: 1.5rem;
  }
  .nav-list li a {
    display: block;
    padding: 0.75rem 1rem;
    text-decoration: none;
    font-weight: bold;
    background-color: rgba(172,172,216,0.2);
    color: #333;
    border-radius: 4px;
    transition: background-color 0.2s;
  }
  .nav-list li a:hover {
    background-color: rgba(172,172,216,0.4);
  }
  ```

* **Spacer**:

  ```css
  .spacer { height: 4rem; }
  ```

* **Container**:

  ```css
  .container {
    margin: 1rem auto;
    max-width: 90%;
    padding: 5rem;
    background-color: rgba(172,172,216,0.2);
    border-radius: 8px;
  }
  ```

* **Sektionen**:

  ```css
  .full-section {
    margin: 1rem auto;
    max-width: 90%;
    width: 100%;
    padding: 2rem 1rem;
    background-color: #fff;
    box-shadow: inset 0 1px 3px rgba(0,0,0,0.1);
    text-align: center;
  }
  .full-section h2 { margin-top: 0; }
  #countdown        { background: linear-gradient(to right, #ffecb3, #ffc107); }
  #informationen    { background: linear-gradient(to right, #c8e6c9, #66bb6a); }
  #veranstaltungen  { background: linear-gradient(to right, #d1c4e9, #7e57c2); }
  #helfer           { background: linear-gradient(to right, #f39a35, #f58748); }
  ```

* **Tabelle**:

  ```css
  .events-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
  }
  .events-table th,
  .events-table td {
    border: 1px solid #999;
    padding: 0.5rem;
    text-align: left;
  }
  .events-table th {
    background-color: #eee;
  }
  ```

* **Karten (Helfer\:innen)**:

  ```css
  .card {
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 6px;
    padding: 1rem;
    margin: 0.5rem 0;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    text-align: left;
  }
  ```

* **Responsive** (für max-width: 768px):

  ```css
  @media (max-width: 768px) {
    .nav-list { gap: 0.5rem; }
    .nav-list li a { padding: 0.5rem 0.75rem; }
    .logo { max-height: 40px; }
  }
  ```


## Funktionaler Überblick

1. ### Countdown

   * **Zieldatum**: 05.07.2025, 12:00 Uhr
   * Berechnet mit `calculateTimeDiff()`, aktualisiert jede Sekunde via `setInterval`.
   * Zeigt verbleibende Tage, Stunden, Minuten, Sekunden im Element `#countdown-timer`.
   * Wenn Zeit ≤ 0, wird Text auf „Das Festival hat begonnen!“ geändert und das Intervall gestoppt.

2. ### Aufklappbare Sektionen

   * **Toggle-Logik**:

     * `hideAllSections()`: Blendet alle drei Detail-Container aus (`.hidden` setzen).
     * `showSection(el)`: Ruft `hideAllSections()` auf und entfernt dann `.hidden` von `el` → nur diese Sektion ist sichtbar.
   * Klick-Listener am jeweiligen `<h2>` und an den entsprechenden Nav-Links rufen `showSection(...)` auf.

3. ### Festival-Informationen

   * Wird eingeblendet, wenn auf „Festival-Organisation“ (Navbar-Link oder Überschrift) geklickt wird.
   * Zeigt organisatorische Details (z. B. Ablauf, Sicherheitskonzept, Logistik).

4. ### Veranstaltungen

   * **`eventsData`**: JavaScript-Array mit Beispiel-Events (Datum, Uhrzeit, Titel, Beschreibung, Anforderungen).
   * **`displayEvents()`**: Baut eine HTML-Tabelle (`.events-table`) und fügt sie in `#events-container` ein.
   * Diese Tabelle ist zunächst ausgeblendet, bis `showSection(veranstaltungenDetailsEl)` aufgerufen wird.

5. ### Helfer\:innen

   * Per Fetch von `https://randomuser.me/api/?results=30&seed=a` werden 30 zufällige Nutzer geladen.
   * **Loader & Fehlermeldung**:

     * Während `fetch()` läuft, wird `#loader` sichtbar.
     * Bei Fehler wird `#error` sichtbar.
   * **Sortier-Dropdown** (`#sort-select`):

     * Neutrale Option (`value=""`): Liste leeren.
     * `name-asc`, `name-desc`: Alphabetische Sortierung nach Vor- & Nachname.
     * `registered-asc`, `registered-desc`: Sortierung nach Registrierungsdatum.
   * **`displayUsers(arr)`**: Erzeugt für jeden Datensatz im Array eine `<li>` mit `.card` und Profilinfo.

6. ### Initialisierung

   * Beim `DOMContentLoaded`-Event wird `initializeApp()` aufgerufen.
   * Reihenfolge:

     1. `startCountdown()`
     2. `displayEvents()` (Tabelle wird in den Container geschrieben, aber bleibt ausgeblendet bis Toggle)
     3. `loadUsers()` (Helfer\:innen werden per Fetch geladen, danach Sortieroptionen aktiv)
     4. Sort-Listener: `sortSelectEl.addEventListener("change", sortUsers)`

---

## Entwicklungsstand und To-Dos

* ✅ Countdown-Anzeige funktioniert korrekt
* ✅ Aufklappbar: Informationen, Veranstaltungen, Helfer\:innen
* ✅ Veranstaltungen-Tabelle generiert aus JavaScript-Daten
* ✅ Helfer\:innen-Fetch und Sortierlogik
* ✅ Responsives Design für Mobilgeräte


---

## Lizenz

Dieses Projekt ist frei verwendbar für Lehrzwecke und kann ohne Einschränkungen als Vorlage dienen.

---

> **Hinweis:**
> Diese Web-App wurde im Rahmen der Lehrveranstaltung „Web-Technologien SOSE 2025“ an der Universität Bamberg erstellt.
