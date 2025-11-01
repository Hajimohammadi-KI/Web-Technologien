// main.js - Main entry point for the Svelte application

import App from './App.svelte'
import './app.css'

// Initialize the Svelte application
const app = new App({
  target: document.getElementById('app'),
})

export default app