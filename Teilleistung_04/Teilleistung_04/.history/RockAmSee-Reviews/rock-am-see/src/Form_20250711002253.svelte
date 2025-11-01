<script>
  let username = '';
  let rating = 1;
  let title = '';
  let text = '';

  function submitForm() {
    console.log('Username:', username);
    console.log('Rating:', rating);
    console.log('Title:', title);
    console.log('Text:', text);
    // اینجا بعداً گزارش را ذخیره خواهیم کرد
  }
</script>

<form on:submit|preventDefault={submitForm} class="mb-4">
  <div class="mb-2">
    <label>Username:</label>
    <input type="text" bind:value={username} maxlength="30" />
  </div>

  <div class="mb-2">
    <label>Rating (1-5):</label>
    <input type="number" min="1" max="5" bind:value={rating} />
  </div>

  <div class="mb-2">
    <label>Title:</label>
    <input type="text" bind:value={title} maxlength="30" />
  </div>

  <div class="mb-2">
    <label>Report:</label>
    <textarea bind:value={text} maxlength="250"></textarea>
  </div>

  <button type="submit">Submit</button>
</form>

<style>
  form {
    border: 1px solid #ccc;
    padding: 1rem;
    border-radius: 5px;
  }

  label {
    display: block;
    margin-bottom: 0.2rem;
  }

  input, textarea {
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
  }

  button {
    padding: 0.5rem 1rem;
  }
</style>
