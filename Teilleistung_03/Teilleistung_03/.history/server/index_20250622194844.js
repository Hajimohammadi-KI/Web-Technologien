import express from "express";  
// Import Express framework to create the server.

import fs from "fs";  
// Import Node.js file system module to read files.

import path from "path";  
// Import path module to handle file paths safely.

const app = express();  
// Create an Express application instance.

const PORT = 3000;  
// Define the port on which the server will listen.

// Route to serve temperature data as JSON
app.get("/wetterdaten/temperatur", (req, res) => {
  // Handle GET requests to /wetterdaten/temperatur
  
  const filePath = path.join(__dirname, "temperatur_stuendlich.json");
  // Build an absolute path to the temperature JSON file
  
  fs.readFile(filePath, "utf8", (err, data) => {
    // Asynchronously read the JSON file
    
    if (err) {
      // If an error occurs while reading the file
      console.error("Error reading temperature data:", err);
      // Log the error for debugging
      
      res.status(500).send("Could not load temperature data");
      // Send HTTP 500 error response
      return;
    }
    
    res.type("application/json").send(data);
    // Send the file content as JSON response
  });
});

// Route to serve cloud cover data as JSON
app.get("/wetterdaten/wolkenbedeckung", (req, res) => {
  // Handle GET requests to /wetterdaten/wolkenbedeckung
  
  const filePath = path.join(__dirname, "wolkenbedeckung_stuendlich.json");
  // Build an absolute path to the cloud cover JSON file
  
  fs.readFile(filePath, "utf8", (err, data) => {
    // Asynchronously read the JSON file
    
    if (err) {
      // If an error occurs while reading the file
      console.error("Error reading cloud cover data:", err);
      // Log the error for debugging
      
      res.status(500).send("Could not load cloud cover data");
      // Send HTTP 500 error response
      return;
    }
    
    res.type("application/json").send(data);
    // Send the file content as JSON response
  });
});

app.listen(PORT, () => {
  // Start the server and listen on the defined port
  
  console.log(`Server running at http://localhost:${PORT}`);
  // Output server start message to console
});
