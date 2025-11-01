<!-- src/Card.svelte -->
<script>
  export let review;
</script>

<div class="card mb-3 shadow-sm">
  <div class="card-body">
    <h5 class="card-title">{review.title}</h5>
    <h6 class="card-subtitle mb-2 text-muted">
      {review.username} – Bewertung: {review.rating}/5
    </h6>
    <p class="card-text">{review.text}</p>
  </div>
</div>
