// src/main.js
import App from './App.svelte';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

// Because compatibility is set to 4:

const app = new App({
  target: document.getElementById('app'),
});

export default app;
