// src/routes.js
import Home from './Home.svelte';
import ReviewDetail from './ReviewDetail.svelte';

export default {
  '/': Home,
  '/review/:id': ReviewDetail
};
