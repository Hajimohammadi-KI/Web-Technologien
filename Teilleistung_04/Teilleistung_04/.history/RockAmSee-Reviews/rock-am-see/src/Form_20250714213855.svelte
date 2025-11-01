<!-- Form.svelte - فرم زیبا و مدرن برای ورود نظرات -->
<script>
    import { addReview } from './stores.js';
    
    // Reactive states for form fields (Svelte 5 syntax)
    let formData = $state({
        username: '',
        rating: 5,
        title: '',
        report: ''
    });
    
    // Validation errors state
    let errors = $state({
        username: '',
        rating: '',
        title: '',
        report: ''
    });
    
    // Animation states
    let isSubmitting = $state(false);
    let showSuccess = $state(false);
    
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
            await new Promise(resolve => setTimeout(resolve, 1000));
            
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

<div class="form-container">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-xl-8 col-lg-10">
                
                <!-- Success Message -->
                {#if showSuccess}
                    <div class="alert alert-success success-alert animate__animated animate__fadeInDown">
                        <div class="d-flex align-items-center">
                            <div class="success-icon me-3">
                                <i class="bi bi-check-circle-fill"></i>
                            </div>
                            <div>
                                <h5 class="alert-heading mb-1">🎉 عالی!</h5>
                                <p class="mb-0">نظر شما با موفقیت ثبت شد و برای دیگران نمایش داده خواهد شد!</p>
                            </div>
                        </div>
                    </div>
                {/if}
                
                <!-- Main Form Card -->
                <div class="form-card">
                    <div class="card-glow"></div>
                    
                    <!-- Card Header -->
                    <div class="card-header">
                        <div class="header-icon">
                            <i class="bi bi-stars"></i>
                        </div>
                        <div class="header-content">
                            <h2 class="card-title">تجربه خود را به اشتراک بگذارید</h2>
                            <p class="card-subtitle">نظرات شما برای ما بسیار ارزشمند است</p>
                        </div>
                    </div>
                    
                    <!-- Card Body -->
                    <div class="card-body">
                        <form on:submit={handleSubmit} class="modern-form">
                            
                            <!-- Top Row - Username & Rating -->
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="username" class="form-label">
                                        <i class="bi bi-person-heart"></i>
                                        نام کاربری
                                    </label>
                                    <div class="input-wrapper">
                                        <input 
                                            type="text" 
                                            id="username"
                                            class="form-control {errors.username ? 'error' : ''}"
                                            bind:value={formData.username}
                                            placeholder="نام خود را وارد کنید..."
                                            maxlength="30"
                                        />
                                        <div class="input-highlight"></div>
                                        {#if errors.username}
                                            <div class="error-message">
                                                <i class="bi bi-exclamation-triangle"></i>
                                                {errors.username}
                                            </div>
                                        {/if}
                                        <div class="char-counter">
                                            <span class="count">{formData.username.length}</span>
                                            <span class="max">/30</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label for="rating" class="form-label">
                                        <i class="bi bi-star-fill"></i>
                                        امتیاز شما
                                    </label>
                                    <div class="rating-wrapper">
                                        <select 
                                            id="rating"
                                            class="form-control rating-select"
                                            bind:value={formData.rating}
                                        >
                                            <option value="1">⭐ (۱ ستاره)</option>
                                            <option value="2">⭐⭐ (۲ ستاره)</option>
                                            <option value="3">⭐⭐⭐ (۳ ستاره)</option>
                                            <option value="4">⭐⭐⭐⭐ (۴ ستاره)</option>
                                            <option value="5">⭐⭐⭐⭐⭐ (۵ ستاره)</option>
                                        </select>
                                        <div class="rating-display">
                                            {getStarRating(formData.rating)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Title Input -->
                            <div class="form-group full-width">
                                <label for="title" class="form-label">
                                    <i class="bi bi-type-h1"></i>
                                    عنوان نظر
                                </label>
                                <div class="input-wrapper">
                                    <input 
                                        type="text" 
                                        id="title"
                                        class="form-control {errors.title ? 'error' : ''}"
                                        bind:value={formData.title}
                                        placeholder="عنوان جذابی برای نظرتان انتخاب کنید..."
                                        maxlength="30"
                                    />
                                    <div class="input-highlight"></div>
                                    {#if errors.title}
                                        <div class="error-message">
                                            <i class="bi bi-exclamation-triangle"></i>
                                            {errors.title}
                                        </div>
                                    {/if}
                                    <div class="char-counter">
                                        <span class="count">{formData.title.length}</span>
                                        <span class="max">/30</span>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Report Textarea -->
                            <div class="form-group full-width">
                                <label for="report" class="form-label">
                                    <i class="bi bi-chat-heart"></i>
                                    تجربه و نظرات شما
                                </label>
                                <div class="input-wrapper">
                                    <textarea 
                                        id="report"
                                        class="form-control textarea {errors.report ? 'error' : ''}"
                                        bind:value={formData.report}
                                        rows="5"
                                        placeholder="تجربه خود از فستیوال را با ما و دیگران به اشتراک بگذارید... نظر شما می‌تواند برای انتخاب دیگران مؤثر باشد!"
                                        maxlength="250"
                                    ></textarea>
                                    <div class="input-highlight"></div>
                                    {#if errors.report}
                                        <div class="error-message">
                                            <i class="bi bi-exclamation-triangle"></i>
                                            {errors.report}
                                        </div>
                                    {/if}
                                    <div class="char-counter">
                                        <span class="count">{formData.report.length}</span>
                                        <span class="max">/250</span>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Submit Button -->
                            <div class="submit-section">
                                <button 
                                    type="submit" 
                                    class="submit-btn {isSubmitting ? 'submitting' : ''}"
                                    disabled={isSubmitting}
                                >
                                    <div class="btn-content">
                                        {#if isSubmitting}
                                            <div class="spinner"></div>
                                            <span>در حال ارسال...</span>
                                        {:else}
                                            <i class="bi bi-send-fill"></i>
                                            <span>ارسال نظر</span>
                                        {/if}
                                    </div>
                                    <div class="btn-glow"></div>
                                </button>
                            </div>
                            
                        </form>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</div>

<style>
    .form-container {
        padding: 3rem 0;
        background: linear-gradient(135deg, 
            rgba(99, 102, 241, 0.05) 0%, 
            rgba(168, 85, 247, 0.05) 25%,
            rgba(236, 72, 153, 0.05) 50%,
            rgba(251, 146, 60, 0.05) 75%,
            rgba(34, 197, 94, 0.05) 100%);
        min-height: 70vh;
        position: relative;
        overflow: hidden;
    }
    
    .form-container::before {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: radial-gradient(circle, rgba(99, 102, 241, 0.03) 0%, transparent 70%);
        animation: float 20s ease-in-out infinite;
    }
    
    @keyframes float {
        0%, 100% { transform: translate(-50%, -50%) rotate(0deg); }
        50% { transform: translate(-50%, -50%) rotate(180deg); }
    }
    
    .form-card {
        position: relative;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(20px);
        border-radius: 24px;
        box-shadow: 
            0 32px 64px rgba(0, 0, 0, 0.1),
            0 16px 32px rgba(0, 0, 0, 0.08),
            inset 0 1px 0 rgba(255, 255, 255, 0.6);
        border: 1px solid rgba(255, 255, 255, 0.2);
        overflow: hidden;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .form-card:hover {
        transform: translateY(-8px);
        box-shadow: 
            0 48px 80px rgba(0, 0, 0, 0.15),
            0 24px 48px rgba(0, 0, 0, 0.12),
            inset 0 1px 0 rgba(255, 255, 255, 0.8);
    }
    
    .card-glow {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 2px;
        background: linear-gradient(90deg, 
            #6366f1, #8b5cf6, #ec4899, #f59e0b, #22c55e);
        background-size: 200% 100%;
        animation: glow 3s ease-in-out infinite;
    }
    
    @keyframes glow {
        0%, 100% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
    }
    
    .card-header {
        padding: 2.5rem 2.5rem 1rem;
        background: linear-gradient(135deg, 
            rgba(99, 102, 241, 0.1) 0%, 
            rgba(168, 85, 247, 0.1) 100%);
        display: flex;
        align-items: center;
        gap: 1.5rem;
    }
    
    .header-icon {
        width: 64px;
        height: 64px;
        background: linear-gradient(135deg, #6366f1, #8b5cf6);
        border-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.8rem;
        color: white;
        box-shadow: 0 8px 32px rgba(99, 102, 241, 0.3);
        animation: pulse 2s ease-in-out infinite;
    }
    
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
    
    .header-content {
        flex: 1;
    }
    
    .card-title {
        font-size: 1.8rem;
        font-weight: 700;
        background: linear-gradient(135deg, #1f2937, #6366f1);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin-bottom: 0.5rem;
    }
    
    .card-subtitle {
        color: #6b7280;
        font-size: 1rem;
        margin: 0;
        opacity: 0.8;
    }
    
    .card-body {
        padding: 2rem 2.5rem 2.5rem;
    }
    
    .modern-form {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }
    
    .form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
    }
    
    .form-group {
        position: relative;
    }
    
    .form-group.full-width {
        grid-column: 1 / -1;
    }
    
    .form-label {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: 600;
        color: #374151;
        margin-bottom: 0.75rem;
        font-size: 0.95rem;
    }
    
    .form-label i {
        color: #6366f1;
        font-size: 1.1rem;
    }
    
    .input-wrapper {
        position: relative;
    }
    
    .form-control {
        width: 100%;
        padding: 1rem 1.25rem;
        border: 2px solid #e5e7eb;
        border-radius: 16px;
        background: rgba(255, 255, 255, 0.8);
        backdrop-filter: blur(10px);
        font-size: 0.95rem;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        z-index: 2;
    }
    
    .form-control:focus {
        outline: none;
        border-color: #6366f1;
        box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
        background: rgba(255, 255, 255, 0.95);
    }
    
    .form-control.error {
        border-color: #ef4444;
        box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.1);
    }
    
    .form-control.textarea {
        resize: vertical;
        min-height: 120px;
        font-family: inherit;
        line-height: 1.6;
    }
    
    .input-highlight {
        position: absolute;
        bottom: 0;
        left: 50%;
        width: 0;
        height: 2px;
        background: linear-gradient(90deg, #6366f1, #8b5cf6);
        transition: all 0.3s ease;
        transform: translateX(-50%);
        z-index: 1;
    }
    
    .form-control:focus + .input-highlight {
        width: 100%;
    }
    
    .rating-wrapper {
        position: relative;
    }
    
    .rating-select {
        appearance: none;
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
        background-position: right 1rem center;
        background-repeat: no-repeat;
        background-size: 1rem;
        padding-right: 3rem;
    }
    
    .rating-display {
        position: absolute;
        top: 50%;
        right: 3rem;
        transform: translateY(-50%);
        font-size: 1.2rem;
        pointer-events: none;
        z-index: 3;
    }
    
    .error-message {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: #ef4444;
        font-size: 0.85rem;
        margin-top: 0.5rem;
        animation: slideIn 0.3s ease;
    }
    
    @keyframes slideIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .char-counter {
        position: absolute;
        bottom: -1.5rem;
        right: 0;
        font-size: 0.8rem;
        color: #9ca3af;
    }
    
    .char-counter .count {
        font-weight: 600;
        color: #6366f1;
    }
    
    .submit-section {
        margin-top: 1rem;
        display: flex;
        justify-content: center;
    }
    
    .submit-btn {
        position: relative;
        background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%);
        background-size: 200% 100%;
        border: none;
        border-radius: 16px;
        padding: 1.25rem 3rem;
        color: white;
        font-weight: 700;
        font-size: 1.1rem;
        cursor: pointer;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        overflow: hidden;
        min-width: 200px;
    }
    
    .submit-btn:hover:not(:disabled) {
        background-position: 100% 0;
        transform: translateY(-2px);
        box-shadow: 0 16px 40px rgba(99, 102, 241, 0.4);
    }
    
    .submit-btn:active:not(:disabled) {
        transform: translateY(0);
    }
    
    .submit-btn:disabled {
        cursor: not-allowed;
        opacity: 0.8;
    }
    
    .submit-btn.submitting {
        background: linear-gradient(135deg, #22c55e, #16a34a);
    }
    
    .btn-content {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.75rem;
        position: relative;
        z-index: 2;
    }
    
    .btn-glow {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), transparent);
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .submit-btn:hover .btn-glow {
        opacity: 1;
    }
    
    .spinner {
        width: 20px;
        height: 20px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-top: 2px solid white;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .success-alert {
        background: linear-gradient(135deg, #22c55e, #16a34a);
        border: none;
        border-radius: 16px;
        color: white;
        margin-bottom: 2rem;
        box-shadow: 0 8px 32px rgba(34, 197, 94, 0.3);
    }
    
    .success-icon {
        font-size: 1.5rem;
    }
    
    /* Responsive Design */
    @media (max-width: 768px) {
        .form-container {
            padding: 2rem 0;
        }
        
        .form-row {
            grid-template-columns: 1fr;
            gap: 1.5rem;
        }
        
        .card-header {
            padding: 2rem 1.5rem 1rem;
            flex-direction: column;
            text-align: center;
            gap: 1rem;
        }
        
        .card-body {
            padding: 1.5rem;
        }
        
        .card-title {
            font-size: 1.5rem;
        }
        
        .submit-btn {
            width: 100%;
            padding: 1.25rem 2rem;
        }
    }
    
    @media (max-width: 480px) {
        .header-icon {
            width: 56px;
            height: 56px;
            font-size: 1.5rem;
        }
        
        .card-title {
            font-size: 1.3rem;
        }
        
        .form-control {
            padding: 0.875rem 1rem;
            font-size: 0.9rem;
        }
    }
</style>