<script>
  export let username;
  export let rating;
  export let title;
  export let review;
</script>

<div class="card p-3 mb-4 shadow-hover">
  <div class="d-flex justify-content-between align-items-center mb-2">
    <strong>{username}</strong>
    <div>
      {#each Array(5) as _, i}
        <i class="bi bi-star-fill" style="color: {i < rating ? 'gold' : 'lightgray'};"></i>
      {/each}
    </div>
  </div>
  <h5>{title}</h5>
  <p>{review}</p>
</div>

<style>
  .card {
    transition: box-shadow 0.3s;
  }
  .shadow-hover:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
  i.bi-star-fill {
    margin-left: 2px;
  }
</style>