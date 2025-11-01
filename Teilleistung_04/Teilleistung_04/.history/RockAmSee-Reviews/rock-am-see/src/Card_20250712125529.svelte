<script>
  export let review;
</script>

<a href={"/review/" + review.id} class="text-decoration-none text-dark">
  <div class="card mb-3 shadow-sm p-3">
    <h5>{review.title}</h5>
    <p><strong>{review.username}</strong> – {review.rating}★</p>
    <p>{review.text.slice(0, 100)}...</p>
  </div>
</a>
