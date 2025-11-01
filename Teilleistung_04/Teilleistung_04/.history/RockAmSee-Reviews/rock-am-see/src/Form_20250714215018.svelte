<!-- Form.svelte - فرم با استفاده از Bootstrap classes - Svelte 4 -->
<script>
    import { addReview } from './stores.js';
    
    // Form data variables (Svelte 4 syntax)
    let formData = {
        username: '',
        rating: 5,
        title: '',
        report: ''
    };
    
    // Validation errors
    let errors = {
        username: '',
        rating: '',
        title: '',
        report: ''
    };
    
    // Animation states
    let isSubmitting = false;
    let showSuccess = false;
    
    // Validation function
    function validateForm() {
        let isValid = true;
        errors = { username: '', rating: '', title: '', report: '' };
        
        if (!formData.username.trim()) {
            errors.username = 'نام کاربری الزامی است';
            isValid = false;
        } else if (formData.username.length > 30) {
            errors.username = 'نام کاربری نباید بیش از ۳۰ کاراکتر باشد';
            isValid = false;
        }
        
        if (formData.rating < 1 || formData.rating > 5) {
            errors.rating = 'امتیاز باید بین ۱ تا ۵ باشد';
            isValid = false;
        }
        
        if (!formData.title.trim()) {
            errors.title = 'عنوان الزامی است';
            isValid = false;
        } else if (formData.title.length > 30) {
            errors.title = 'عنوان نباید بیش از ۳۰ کاراکتر باشد';
            isValid = false;
        }
        
        if (!formData.report.trim()) {
            errors.report = 'نظر شما الزامی است';
            isValid = false;
        } else if (formData.report.length > 250) {
            errors.report = 'نظر نباید بیش از ۲۵۰ کاراکتر باشد';
            isValid = false;
        }
        
        return isValid;
    }
    
    // Submit handler with animation
    async function handleSubmit(event) {
        event.preventDefault();
        
        if (validateForm()) {
            isSubmitting = true;
            
            // Simulate API call delay for smooth animation
            await new Promise(resolve => setTimeout(resolve, 800));
            
            addReview(formData);
            
            // Reset form
            formData = {
                username: '',
                rating: 5,
                title: '',
                report: ''
            };
            
            isSubmitting = false;
            showSuccess = true;
            
            // Hide success message after 3 seconds
            setTimeout(() => {
                showSuccess = false;
            }, 3000);
        }
    }
    
    // Get star display for rating
    function getStarRating(rating) {
        return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
    }
</script>

<div class="container my-5">
    <div class="row justify-content-center">
        <div class="col-lg-8 col-md-10">
            
            <!-- Success Alert -->
            {#if showSuccess}
                <div class="alert alert-success alert-dismissible fade show border-0 shadow-sm mb-4" role="alert">
                    <div class="d-flex align-items-center">
                        <div class="me-3">
                            <i class="bi bi-check-circle-fill fs-4 text-success"></i>
                        </div>
                        <div>
                            <h5 class="alert-heading mb-1 fw-bold">🎉 عالی!</h5>
                            <p class="mb-0">نظر شما با موفقیت ثبت شد و برای دیگران نمایش داده خواهد شد!</p>
                        </div>
                    </div>
                </div>
            {/if}
            
            <!-- Main Form Card -->
            <div class="card border-0 shadow-lg">
                <div class="card-header bg-primary text-white p-4">
                    <div class="d-flex align-items-center">
                        <div class="me-3">
                            <i class="bi bi-stars fs-2"></i>
                        </div>
                        <div>
                            <h3 class="card-title mb-1 fw-bold">تجربه خود را به اشتراک بگذارید</h3>
                            <p class="card-text mb-0 opacity-75">نظرات شما برای ما بسیار ارزشمند است</p>
                        </div>
                    </div>
                </div>
                
                <div class="card-body p-4">
                    <form on:submit={handleSubmit}>
                        
                        <!-- Username & Rating Row -->
                        <div class="row g-3 mb-3">
                            <div class="col-md-6">
                                <label for="username" class="form-label fw-semibold">
                                    <i class="bi bi-person-heart text-primary me-2"></i>
                                    نام کاربری
                                </label>
                                <input 
                                    type="text" 
                                    id="username"
                                    class="form-control {errors.username ? 'is-invalid' : ''}"
                                    bind:value={formData.username}
                                    placeholder="نام خود را وارد کنید..."
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
                                        {formData.username.length}/30 کاراکتر
                                    </span>
                                </div>
                            </div>
                            
                            <div class="col-md-6">
                                <label for="rating" class="form-label fw-semibold">
                                    <i class="bi bi-star-fill text-warning me-2"></i>
                                    امتیاز شما
                                </label>
                                <select 
                                    id="rating"
                                    class="form-select {errors.rating ? 'is-invalid' : ''}"
                                    bind:value={formData.rating}
                                >
                                    <option value="1">⭐ (۱ ستاره)</option>
                                    <option value="2">⭐⭐ (۲ ستاره)</option>
                                    <option value="3">⭐⭐⭐ (۳ ستاره)</option>
                                    <option value="4">⭐⭐⭐⭐ (۴ ستاره)</option>
                                    <option value="5">⭐⭐⭐⭐⭐ (۵ ستاره)</option>
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
                        
                        <!-- Title Input -->
                        <div class="mb-3">
                            <label for="title" class="form-label fw-semibold">
                                <i class="bi bi-type-h1 text-info me-2"></i>
                                عنوان نظر
                            </label>
                            <input 
                                type="text" 
                                id="title"
                                class="form-control {errors.title ? 'is-invalid' : ''}"
                                bind:value={formData.title}
                                placeholder="عنوان جذابی برای نظرتان انتخاب کنید..."
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
                                    {formData.title.length}/30 کاراکتر
                                </span>
                            </div>
                        </div>
                        
                        <!-- Report Textarea -->
                        <div class="mb-4">
                            <label for="report" class="form-label fw-semibold">
                                <i class="bi bi-chat-heart text-success me-2"></i>
                                تجربه و نظرات شما
                            </label>
                            <textarea 
                                id="report"
                                class="form-control {errors.report ? 'is-invalid' : ''}"
                                bind:value={formData.report}
                                rows="5"
                                placeholder="تجربه خود از فستیوال را با ما و دیگران به اشتراک بگذارید... نظر شما می‌تواند برای انتخاب دیگران مؤثر باشد!"
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
                                    {formData.report.length}/250 کاراکتر
                                </span>
                            </div>
                        </div>
                        
                        <!-- Submit Button -->
                        <div class="d-grid">
                            <button 
                                type="submit" 
                                class="btn btn-lg {isSubmitting ? 'btn-success' : 'btn-primary'} fw-bold"
                                disabled={isSubmitting}
                            >
                                {#if isSubmitting}
                                    <div class="spinner-border spinner-border-sm me-2" role="status">
                                        <span class="visually-hidden">Loading...</span>
                                    </div>
                                    در حال ارسال...
                                {:else}
                                    <i class="bi bi-send-fill me-2"></i>
                                    ارسال نظر
                                {/if}
                            </button>
                        </div>
                        
                    </form>
                </div>
                
                <!-- Card Footer -->
                <div class="card-footer bg-light text-center">
                    <small class="text-muted">
                        <i class="bi bi-shield-check text-success me-1"></i>
                        نظرات شما محرمانه و امن نگهداری می‌شود
                    </small>
                </div>
            </div>
            
        </div>
    </div>
</div>

<style>
    /* Minimal Custom CSS*/
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
        background: linear-gradient(135deg, var(--bs-primary), var(--bs-purple)) !important;
        border-bottom: none;
    }
    
    .form-control:focus, .form-select:focus {
        border-color: var(--bs-primary);
        box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
    }
    
    .btn-primary {
        background: linear-gradient(135deg, var(--bs-primary), var(--bs-purple));
        border: none;
        transition: all 0.3s ease;
    }
    
    .btn-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
    }
    
    .btn-success {
        background: linear-gradient(135deg, var(--bs-success), var(--bs-green));
        border: none;
    }
    
    .alert {
        border-radius: 0.75rem !important;
        border: none !important;
    }
    
    .form-control, .form-select {
        border-radius: 0.5rem;
        border-width: 2px;
        transition: all 0.3s ease;
    }
    
    .is-invalid {
        border-color: var(--bs-danger) !important;
    }
    
    .badge {
        font-size: 0.7rem;
    }
    
    /* Animation for success alert */
    .alert.show {
        animation: slideInDown 0.5s ease;
    }
    
    @keyframes slideInDown {
        from {
            opacity: 0;
            transform: translateY(-30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    /* Spinner animation */
    .spinner-border-sm {
        width: 1rem;
        height: 1rem;
    }
</style>