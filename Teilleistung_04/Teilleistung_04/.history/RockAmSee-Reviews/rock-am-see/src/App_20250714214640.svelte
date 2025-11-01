<!-- App.svelte - اپلیکیشن اصلی با Bootstrap -->
<script>
    import Header from './lib/Header.svelte';
    import Form from './lib/Form.svelte';
    import Reviews from './lib/Reviews.svelte';
    import 'bootstrap/dist/css/bootstrap.min.css';
</script>

<!-- Bootstrap و Meta Tags -->
<svelte:head>
    <title>Rock am See Reviews 2025 | نظرات فستیوال</title>
    <meta name="description" content="Teilen Sie Ihre Erlebnisse vom Rock am See 2025 Festival mit anderen.">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css" rel="stylesheet">
</svelte:head>

<!-- Main App Container -->
<div class="app-container">
    
    <!-- Header Section -->
    <Header />
    
    <!-- Main Content -->
    <main class="main-content">
        
        <!-- Form Section -->
        <section class="form-section bg-white">
            <Form />
        </section>
        
        <!-- Reviews Section -->
        <section class="reviews-section">
            <Reviews />
        </section>
        
    </main>
    
    <!-- Footer -->
    <footer class="bg-dark text-white py-4 mt-auto">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-md-6">
                    <div class="d-flex align-items-center">
                        <div class="me-3">
                            <i class="bi bi-music-note-beamed fs-4 text-primary"></i>
                        </div>
                        <div>
                            <h5 class="mb-1 fw-bold">Rock am See Festival 2025</h5>
                            <p class="mb-0 text-muted small">Das beste Musikerlebnis am See</p>
                        </div>
                    </div>
                </div>
                
                <div class="col-md-6 text-md-end mt-3 mt-md-0">
                    <div class="mb-2">
                        <span class="badge bg-primary me-2">
                            <i class="bi bi-heart-fill me-1"></i>
                            Svelte
                        </span>
                        <span class="badge bg-purple">
                            <i class="bi bi-bootstrap-fill me-1"></i>
                            Bootstrap
                        </span>
                    </div>
                    <small class="text-muted">
                        © 2025 Rock am See Festival. .
                    </small>
                </div>
            </div>
            
            <!-- Footer Links -->
            <hr class="my-3 border-secondary">
            <div class="row">
                <div class="col-12 text-center">
                    <div class="d-flex justify-content-center gap-4 flex-wrap">
                        <a href="#" class="text-decoration-none text-muted small hover-link">
                            <i class="bi bi-hou