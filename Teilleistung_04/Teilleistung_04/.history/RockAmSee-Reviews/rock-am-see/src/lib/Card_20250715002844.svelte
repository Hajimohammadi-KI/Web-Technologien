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
                  <div class="invalid-feedback">{errors.rating}</div>
                {/if}
              </div>
            </div>
            
            <!-- Title Input -->
            <div class="mb-3">
              <label for="title" class="form-label">Titel</label>
              <input 
                type="text" 
                class="form-control {errors.title ? 'is-invalid' : ''}"
                id="title"
                bind:value={title}
                maxlength="50"
                placeholder="Kurzer Titel deiner Erfahrung"
              />
              {#if errors.title}
                <div class="invalid-feedback">{errors.title}</div>
              {/if}
            </div>
            
            <!-- Review Input -->
            <div class="mb-3">
              <label for="review" class="form-label">Erfahrungsbericht</label>
              <textarea 
                class="form-control {errors.review ? 'is-invalid' : ''}"
                id="review"
                bind:value={review}
                rows="5"
                maxlength="500"
                placeholder="Deine ausführliche Erfahrung"
              ></textarea>
              {#if errors.review}
                <div class="invalid-feedback">{errors.review}</div>
              {/if}
            </div>
            
            <!-- Submit Button -->
            <button type="submit" class="btn btn-primary w-100">Bericht senden</button>
          </form>
        </div>
      </div>
    </div>
  </div>