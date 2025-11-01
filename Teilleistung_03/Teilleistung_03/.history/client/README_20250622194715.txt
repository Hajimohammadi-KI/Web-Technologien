🌟 # Festival am See - Weather Analysis SPA

## 📌 Overview

This is a single-page application (SPA) that analyzes weather data (temperature and cloud cover) for the **Festival am See** period.
The app provides:

* A pie chart showing the percentage of time the temperature was above or below a threshold (default: 20°C).
* A line chart showing hourly cloud cover percentage.
* A responsive, Bootstrap-styled layout.

The project consists of:

* A **frontend**: HTML + D3.js + Bootstrap
* A **backend**: Node.js + Express serving JSON data

---

## ⚙️ Technologies

* **Node.js / Express.js** — Backend API server
* **D3.js v7** — Data visualization
* **Bootstrap 5.3** — Styling and layout

---

## 🚀 How to Run

### 1️⃣ Install dependencies

In the project’s root directory (where `package.json` is located), run:

```bash
npm install
```

This will install:

* Express.js (for the backend server)
* Any other dependencies listed in `package.json`

⚠ **Note:** If you see warnings about vulnerabilities during `npm install`, you can safely ignore them for this project (as stated in the assignment).

---

### 2️⃣ Start the backend server

The backend provides API endpoints for temperature and cloud cover data.
Start it using:

```bash
node server/index.js
```

✅ The server will run at:

* [http://localhost:3000/wetterdaten/temperatur](http://localhost:3000/wetterdaten/temperatur) — temperature data
* [http://localhost:3000/wetterdaten/wolkenbedeckung](http://localhost:3000/wetterdaten/wolkenbedeckung) — cloud cover data

👉 **Tip:** Open these URLs in your browser to confirm data is served correctly.

---

### 3️⃣ Start the frontend

The frontend is a static HTML + JS app. Use **Live Server** (or equivalent) to serve it:

* Open `client/index.html` in VS Code
* Right-click → **Open with Live Server**

✅ The app will display:

* The temperature pie chart
* The cloud cover line chart

⚠ **Important:** Ensure the backend is running so the frontend can successfully fetch data.

---

### 4️⃣ (Optional) Use `npm run server`

If you have added a script in `package.json`, you can also start the server using:

```bash
npm run server
```

This is equivalent to `node server/index.js`.

---

## 📂 Directory Structure

```
project-root/
├── client/
│   ├── index.html           # The main frontend page
│   ├── index.js             # Contains D3.js chart logic
├── server/
│   ├── index.js             # Express backend server code
│   ├── temperatur_stuendlich.json     # Temperature data file
│   ├── wolkenbedeckung_stuendlich.json # Cloud cover data file
├── package.json
├── README.md
```

---

## 🌍 Deployment Notes

➡ This app is designed for local use for testing or university submission.

➡ If you want to deploy it online:

* **Frontend:** You can host `client/` on static site platforms (e.g. Netlify, GitHub Pages)
* **Backend:** Deploy `server/` on Node-compatible platforms (e.g. Heroku, Railway, Render)

⚠ **If you deploy both frontend and backend separately, ensure proper CORS setup or serve both from the same domain.**

