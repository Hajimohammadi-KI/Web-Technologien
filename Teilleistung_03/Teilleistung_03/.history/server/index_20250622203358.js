import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3000;

// Needed to get __dirname with ES module syntax
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Middleware to serve static files from the 'public' directory
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// Add CORS headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins (for local testing)
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Route for temperature JSON
app.get("/wetterdaten/temperatur", (req, res) => {
  res.sendFile(path.join(__dirname, "temperatur_stuendlich.json"));
});

// Route for cloud cover JSON
app.get("/wetterdaten/wolkenbedeckung", (req, res) => {
  res.sendFile(path.join(__dirname, "wolkenbedeckung_stuendlich.json"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
