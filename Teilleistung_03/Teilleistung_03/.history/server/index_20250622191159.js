import express from "express";  
// Import the Express framework to create the backend server.

import fs from "fs";  
// Import Node's file system module to read JSON data files.

import path from "path";  
// Import Node's path module to handle file paths in a safe way.

const app = express();  
// Create an instance of an Express application.

const PORT = 3000;  
// Define the port on which the server will listen.

// Define the route for serving temperature data
app.get("/wetterdaten/temperatur", (req, res) => {
  // When a GET request is made to /wetterdaten/temperatur:
  
  const filePath = path.join(__dirname, "temperatur_stuendlich.json");
  // Build the absolute path to the temperature JSON file.

  fs.readFile(filePath, "utf8", (err, data) => {
    // Read the temperature JSON file asynchronously.

    if (err) {
      // If an error occurs during reading:
      console.error("Error reading temperature file:", err);
      // Log the error to the console for debugging.

      res.status(500).send("Error loading temperature data");
      // Send a 500 error response to the client.
      return;
    }

    res.type("application/json").send(data);
    // Send the file content as JSON response.
  });
});

// Define the route for serving cloud cover data
app.get("/wetterdaten/wolkenbedeckung", (req, res) => {
  // When a GET request is made to /wetterdaten/wolkenbedeckung:
  
  const filePath = path.join(__dirname, "wolkenbedeckung_stuendlich.json");
  // Build the absolute path to the cloud cover JSON file.

  fs.readFile(filePath, "utf8", (err, data) => {
    // Read the cloud cover JSON file asynchronously.

    if (err) {
      // If an error occurs during reading:
      console.error("Error reading cloud cover file:", err);
      // Log the error to the console for debugging.

      res.status(500).send("Error loading cloud cover data");
      // Send a 500 error response to the client.
      return;
    }

    res.type("application/json").send(data);
    // Send the file content as JSON response.
  });
});

app.listen(PORT, () => {
  // Start the server and listen on the specified port.

  console.log(`Server started on port ${PORT}. Access via http://localhost:${PORT}`);
  // Log to console that the server is up and running.
});
