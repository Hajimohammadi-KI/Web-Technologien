import App from './App.svelte';

// 👉 Bootstrap CSS global laden
import 'bootstrap/dist/css/bootstrap.min.css';

const app = new App({
  target: document.getElementById('app'),
});

export default app;
