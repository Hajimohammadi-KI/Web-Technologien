import App from './App.svelte';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css'; // یا './assets/styles/app.css'

const app = new App({
  target: document.getElementById('app'),
});

export default app;
