// src/stores.js
import { writable } from 'svelte/store';

export const reviewsStore = writable([
  {
    id: 1,
    username: 'Alice',
    rating: 5,
    title: 'Great event!',
    review: 'Had an amazing time at Rock am See.'
  },
  {
    id: 2,
    username: 'Bob',
    rating: 4,
    title: 'Good vibes',
    review: 'Enjoyed the music and atmosphere.'
  }
]);
