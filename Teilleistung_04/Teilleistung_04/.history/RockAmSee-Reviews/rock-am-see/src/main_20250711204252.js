// src/main.js
import App from './App.svelte';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

// چون compatibility روی 4 است:
const app = new App({
  target: document.getElementById('app'),
});

export default app;
