// Import Express framework so we can create the server
import express from "express";

// Import path utilities to handle file paths
import path from "path";

// Import fileURLToPath to get __dirname with ES module
import { fileURLToPath } from "url";

const app = express(); // Create Express app
const PORT = 3000;     // Define the port where server will run

// Get __dirname because ES modules don't have it by default
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware to allow CORS for all requests (for local testing)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins
  res.setHeader('Access-Control-Allow-Methods', 'GET'); // Allow GET method
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Allow these headers
  next(); // Move to next middleware or route
});

// Route to serve temperature data JSON file
app.get("/wetterdaten/temperatur", (req, res) => {
  // Send the temperatur_stuendlich.json file as response
  res.sendFile(path.join(__dirname, "temperatur_stuendlich.json"));
});

// Route to serve cloud cover data JSON file
app.get("/wetterdaten/wolkenbedeckung", (req, res) => {
  // Send the wolkenbedeckung_stuendlich.json file as response
  res.sendFile(path.join(__dirname, "wolkenbedeckung_stuendlich.json"));
});

// Start the server on the specified port
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`); // Log when server starts
});
