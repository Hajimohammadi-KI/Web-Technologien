<!-- Form.svelte - Formular mit Bootstrap-Klassen - Svelte 4 -->
<script>
    import { addReview } from './stores.js';
    
    // Formulardaten-Variablen (Svelte 4-Syntax)
    let formData = {
        username: '',
        rating: 5,
        title: '',
        report: ''
    };
    
    // Validierungsfehler
    let errors = {
        username: '',
        rating: '',
        title: '',
        report: ''
    };
    
    // Animationszustände
    let isSubmitting = false;
    let showSuccess = false;
    
    // Validierungsfunktion
    function validateForm() {
        let isValid = true;
        errors = { username: '', rating: '', title: '', report: '' };
        
        if (!formData.username.trim()) {
            errors.username = 'Benutzername ist erforderlich';
            isValid = false;
        } else if (formData.username.length > 30) {
            errors.username = 'Benutzername darf maximal 30 Zeichen haben';
            isValid = false;
        }
        
        if (formData.rating < 1 || formData.rating > 5) {
            errors.rating = 'Bewertung muss zwischen 1 und 5 sein';
            isValid = false;
        }
        
        if (!formData.title.trim()) {
            errors.title = 'Titel ist erforderlich';
            isValid = false;
        } else if (formData.title.length > 30) {
            errors.title = 'Titel darf maximal 30 Zeichen haben';
            isValid = false;
        }
        
        if (!formData.report.trim()) {
            errors.report = 'Erfahrungsbericht ist erforderlich';
            isValid = false;
        } else if (formData.report.length > 250) {
            errors.report = 'Erfahrungsbericht darf maximal 250 Zeichen haben';
            isValid = false;
        }
        
        return isValid;
    }
    
    // Submit-Handler mit Animation
    async function handleSubmit(event) {
        event.preventDefault();
        
        if (validateForm()) {
            isSubmitting = true;
            
            // API-Aufruf-Verzögerung für sanfte Animation simulieren
            await new Promise(resolve => setTimeout(resolve, 800));
            
            addReview(formData);
            
            // Formular zurücksetzen
            formData = {
                username: '',
                rating: 5,
                title: '',
                report: ''
            };
            
            isSubmitting = false;
            showSuccess = true;
            
            // Erfolgsmeldung nach 3 Sekunden ausblenden
            setTimeout(() => {
                showSuccess = false;
            }, 3000);
        }
    }
    
    // Sterne-Anzeige für Bewertung abrufen
    function getStarRating(rating) {
        return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
    }
</script>

<div class="container my-5">
    <div class="row justify-content-center">
        <div class="col-lg-8 col-md-10">
            
            <!-- Erfolgs-Alert -->
            {#if showSuccess}
                <div class="alert alert-success alert-dismissible fade show border-0 shadow-sm mb-4" role="alert">
                    <div class="d-flex align-items-center">
                        <div class="me-3">
                            <i class="bi bi-check-circle-fill fs-4 text-success"></i>
                        </div>
                        <div>
                            <h5 class="alert-heading mb-1 fw-bold">🎉 Ausgezeichnet!</h5>
                            <p class="mb-0">Ihre Bewertung wurde erfolgreich gespeichert und wird anderen angezeigt!</p>
                        </div>
                    </div>
                </div>
            {/if}
            
            <!-- Haupt-Formular-Karte -->
            <div class="card border-0 shadow-lg">
                <div class="card-header bg-primary text-white p-4">
                    <div class="d-flex align-items-center">
                        <div class="me-3">
                            <i class="bi bi-stars fs-2"></i>
                        </div>
                        <div>
                            <h3 class="card-title mb-1 fw-bold">Teilen Sie Ihre Erfahrung</h3>
                            <p class="card-text mb-0 opacity-75">Ihre Bewertung ist sehr wertvoll für uns</p>
                        </div>
                    </div>
                </div>
                
                <div class="card-body p-4">
                    <form on:submit={handleSubmit}>
                        
                        <!-- Benutzername & Bewertung Zeile -->
                        <div class="row g-3 mb-3">
                            <div class="col-md-6">
                                <label for="username" class="form-label fw-semibold">
                                    <i class="bi bi-person-heart text-primary me-2"></i>
                                    Benutzername
                                </label>
                                <input 
                                    type="text" 
                                    id="username"
                                    class="form-control {errors.username ? 'is-invalid' : ''}"
                                    bind:value={formData.username}
                                    placeholder="Geben Sie Ihren Namen ein..."
                                    maxlength="30"
                                />
                                {#if errors.username}
                                    <div class="invalid-feedback">
                                        <i class="bi bi-exclamation-triangle me-1"></i>
                                        {errors.username}
                                    </div>
                                {/if}
                                <div class="form-text">
                                    <span class="badge bg-light text-dark">
                                        {formData.username.length}/30 Zeichen
                                    </span>
                                </div>
                            </div>
                            
                            <div class="col-md-6">
                                <label for="rating" class="form-label fw-semibold">
                                    <i class="bi bi-star-fill text-warning me-2"></i>
                                    Ihre Bewertung
                                </label>
                                <select 
                                    id="rating"
                                    class="form-select {errors.rating ? 'is-invalid' : ''}"
                                    bind:value={formData.rating}
                                >
                                    <option value="1">⭐ (1 Stern)</option>
                                    <option value="2">⭐⭐ (2 Sterne)</option>
                                    <option value="3">⭐⭐⭐ (3 Sterne)</option>
                                    <option value="4">⭐⭐⭐⭐ (4 Sterne)</option>
                                    <option value="5">⭐⭐⭐⭐⭐ (5 Sterne)</option>
                                </select>
                                {#if errors.rating}
                                    <div class="invalid-feedback">
                                        <i class="bi bi-exclamation-triangle me-1"></i>
                                        {errors.rating}
                                    </div>
                                {/if}
                                <div class="form-text">
                                    <span class="fs-5">{getStarRating(formData.rating)}</span>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Titel-Eingabe -->
                        <div class="mb-3">
                            <label for="title" class="form-label fw-semibold">
                                <i class="bi bi-type-h1 text-info me-2"></i>
                                Bewertungstitel
                            </label>
                            <input 
                                type="text" 
                                id="title"
                                class="form-control {errors.title ? 'is-invalid' : ''}"
                                bind:value={formData.title}
                                placeholder="Wählen Sie einen attraktiven Titel für Ihre Bewertung..."
                                maxlength="30"
                            />
                            {#if errors.title}
                                <div class="invalid-feedback">
                                    <i class="bi bi-exclamation-triangle me-1"></i>
                                    {errors.title}
                                </div>
                            {/if}
                            <div class="form-text">
                                <span class="badge bg-light text-dark">
                                    {formData.title.length}/30 Zeichen
                                </span>
                            </div>
                        </div>
                        
                        <!-- Bericht Textarea -->
                        <div class="mb-4">
                            <label for="report" class="form-label fw-semibold">
                                <i class="bi bi-chat-heart text-success me-2"></i>
                                Ihre Erfahrungen und Gedanken
                            </label>
                            <textarea 
                                id="report"
                                class="form-control {errors.report ? 'is-invalid' : ''}"
                                bind:value={formData.report}
                                rows="5"
                                placeholder="Teilen Sie Ihre Erfahrungen vom Festival mit uns und anderen... Ihre Bewertung kann für die Entscheidung anderer sehr hilfreich sein!"
                                maxlength="250"
                            ></textarea>
                            {#if errors.report}
                                <div class="invalid-feedback">
                                    <i class="bi bi-exclamation-triangle me-1"></i>
                                    {errors.report}
                                </div>
                            {/if}
                            <div class="form-text">
                                <span class="badge bg-light text-dark">
                                    {formData.report.length}/250 Zeichen
                                </span>
                            </div>
                        </div>
                        
                        <!-- Submit-Button -->
                        <div class="d-grid">
                            <button 
                                type="submit" 
                                class="btn btn-lg {isSubmitting ? 'btn-success' : 'btn-primary'} fw-bold"
                                disabled={isSubmitting}
                            >
                                {#if isSubmitting}
                                    <div class="spinner-border spinner-border-sm me-2" role="status">
                                        <span class="visually-hidden">Wird geladen...</span>
                                    </div>
                                    Wird gesendet...
                                {:else}
                                    <i class="bi bi-send-fill me-2"></i>
                                    Bewertung senden
                                {/if}
                            </button>
                        </div>
                        
                    </form>
                </div>
                
                <!-- Karten-Footer -->
                <div class="card-footer bg-light text-center">
                    <small class="text-muted">
                        <i class="bi bi-shield-check text-success me-1"></i>
                        Ihre Bewertungen werden vertraulich und sicher aufbewahrt
                    </small>
                </div>
            </div>
            
        </div>
    </div>
</div>

<style>
    .card {
        border-radius: 1rem !important;
        overflow: hidden;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .card:hover {
        transform: translateY(-5px);
        box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175) !important;
    }
    
    .card-header {
        background: linear-gradient(135deg, var(--bs-primary), #6f42c1) !important;
        border-bottom: none;
    }
    
    .form-control:focus, .form-select:focus {
        border-color: var(--bs-primary);
        box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
    }
    
    .btn-primary {
        background: linear-gradient(135deg, var(--bs-primary), #6f42c1);
        border: none;
        transition: all 0.3s ease;
    }
    
    .btn-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
    }
</style>