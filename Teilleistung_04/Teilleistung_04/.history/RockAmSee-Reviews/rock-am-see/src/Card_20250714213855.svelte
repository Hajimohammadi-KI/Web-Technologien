<!-- Card.svelte - کارت مدرن و زیبا برای نمایش نظرات -->
<script>
    // Props for review data (Svelte 5 syntax)
    let { review } = $props();
    
    // Generate stars display
    function generateStars(rating) {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push({
                filled: i <= rating,
                index: i
            });
        }
        return stars;
    }
    
    // Reactive stars calculation
    $: stars = generateStars(review.rating);
    
    // Format date
    function formatDate(timestamp) {
        if (!timestamp) return '';
        const date = new Date(timestamp);
        return date.toLocaleDateString('fa-IR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    }
    
    // Get rating color based on score
    function getRatingColor(rating) {
        if (rating >= 5) return '#22c55e'; // green
        if (rating >= 4) return '#eab308'; // yellow
        if (rating >= 3) return '#f97316'; // orange
        if (rating >= 2) return '#ef4444'; // red
        return '#6b7280'; // gray
    }
    
    // Get card border glow based on rating
    function getCardGlow(rating) {
        if (rating >= 5) return 'glow-excellent';
        if (rating >= 4) return 'glow-good';
        if (rating >= 3) return 'glow-average';
        return 'glow-poor';
    }
</script>

<div class="review-card {getCardGlow(review.rating)}" data-rating={review.rating}>
    <!-- Card Background Elements -->
    <div class="card-background">
        <div class="card-gradient"></div>
        <div class="card-pattern"></div>
    </div>
    
    <!-- Card Glow Effect -->
    <div class="card-glow" style="--glow-color: {getRatingColor(review.rating)}"></div>
    
    <!-- Card Content -->
    <div class="card-content">
        
        <!-- Header Section -->
        <div class="card-header">
            <div class="user-info">
                <div class="user-avatar">
                    <div class="avatar-inner">
                        <i class="bi bi-person-heart"></i>
                    </div>
                    <div class="avatar-ring"></div>
                </div>
                <div class="user-details">
                    <h6 class="username">
                        {review.username}
                    </h6>
                    <small class="review-date">
                        <i class="bi bi-calendar-heart"></i>
                        {formatDate(review.timestamp)}
                    </small>
                </div>
            </div>
            
            <div class="rating-section">
                <div class="rating-stars">
                    {#each stars as star (star.index)}
                        <span class="star {star.filled ? 'filled' : 'empty'}" 
                              data-star={star.index}>
                            ⭐
                        </span>
                    {/each}
                </div>
                <div class="rating-badge" style="--badge-color: {getRatingColor(review.rating)}">
                    {review.rating}/5
                </div>
            </div>
        </div>
        
        <!-- Title Section -->
        <div class="title-section">
            <h5 class="review-title">
                <span class="title-icon">💭</span>
                {review.title}
            </h5>
        </div>
        
        <!-- Content Section -->
        <div class="content-section">
            <div class="content-wrapper">
                <div class="quote-mark start">"</div>
                <p class="review-text">
                    {review.report}
                </p>
                <div class="quote-mark end">"</div>
            </div>
        </div>
        
        <!-- Footer Section -->
        <div class="card-footer">
            <div class="footer-decoration">
                <div class="decoration-line"></div>
                <div class="decoration-center">
                    <i class="bi bi-music-note"></i>
                </div>
                <div class="decoration-line"></div>
            </div>
            
            <div class="engagement-stats">
                <div class="stat-item">
                    <i class="bi bi-eye-fill"></i>
                    <span>نمایش</span>
                </div>
                <div class="stat-item">
                    <i class="bi bi-heart-fill"></i>
                    <span>پسندیده</span>
                </div>
            </div>
        </div>
        
    </div>
    
    <!-- Floating Elements -->
    <div class="floating-elements">
        <div class="float-element element-1">🎵</div>
        <div class="float-element element-2">💫</div>
        <div class="float-element element-3">🎸</div>
    </div>
</div>

<style>
    .review-card {
        position: relative;
        height: 320px;
        border-radius: 24px;
        overflow: hidden;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        cursor: pointer;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.1),
            0 4px 16px rgba(0, 0, 0, 0.05);
    }
    
    .review-card:hover {
        transform: translateY(-8px) scale(1.02);
        box-shadow: 
            0 24px 48px rgba(0, 0, 0, 0.15),
            0 12px 24px rgba(0, 0, 0, 0.1);
    }
    
    /* Glow Effects Based on Rating */
    .review-card.glow-excellent:hover {
        box-shadow: 
            0 24px 48px rgba(34, 197, 94, 0.3),
            0 12px 24px rgba(34, 197, 94, 0.2);
    }
    
    .review-card.glow-good:hover {
        box-shadow: 
            0 24px 48px rgba(234, 179, 8, 0.3),
            0 12px 24px rgba(234, 179, 8, 0.2);
    }
    
    .review-card.glow-average:hover {
        box-shadow: 
            0 24px 48px rgba(249, 115, 22, 0.3),
            0 12px 24px rgba(249, 115, 22, 0.2);
    }
    
    .review-card.glow-poor:hover {
        box-shadow: 
            0 24px 48px rgba(239, 68, 68, 0.3),
            0 12px 24px rgba(239, 68, 68, 0.2);
    }
    
    .card-background {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1;
    }
    
    .card-gradient {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.1) 0%, 
            rgba(255, 255, 255, 0.05) 100%);
    }
    
    .card-pattern {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: 
            radial-gradient(circle at 20% 20%, rgba(99, 102, 241, 0.05) 1px, transparent 1px),
            radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.05) 1px, transparent 1px);
        background-size: 30px 30px;
    }
    
    .card-glow {
        position: absolute;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        background: var(--glow-color);
        border-radius: 26px;
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 0;
        filter: blur(8px);
    }
    
    .review-card:hover .card-glow {
        opacity: 0.2;
    }
    
    .card-content {
        position: relative;
        z-index: 2;
        height: 100%;
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
    }
    
    .card-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 1rem;
        padding-bottom: 1rem;
        border-bottom: 2px solid rgba(99, 102, 241, 0.1);
    }
    
    .user-info {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        flex: 1;
    }
    
    .user-avatar {
        position: relative;
        width: 45px;
        height: 45px;
    }
    
    .avatar-inner {
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #6366f1, #8b5cf6);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 1.2rem;
        box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
        position: relative;
        z-index: 2;
    }
    
    .avatar-ring {
        position: absolute;
        top: -3px;
        left: -3px;
        right: -3px;
        bottom: -3px;
        border: 2px solid transparent;
        border-radius: 50%;
        background: linear-gradient(45deg, #6366f1, #8b5cf6, #ec4899) border-box;
        mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
        mask-composite: subtract;
        animation: avatarRotate 3s linear infinite;
    }
    
    @keyframes avatarRotate {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .user-details {
        flex: 1;
        min-width: 0;
    }
    
    .username {
        font-weight: 700;
        color: #1f2937;
        margin: 0 0 0.25rem 0;
        font-size: 1rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .review-date {
        color: #6b7280;
        font-size: 0.8rem;
        display: flex;
        align-items: center;
        gap: 0.25rem;
    }
    
    .rating-section {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 0.5rem;
    }
    
    .rating-stars {
        display: flex;
        gap: 2px;
    }
    
    .star {
        font-size: 1.1rem;
        transition: all 0.2s ease;
        display: inline-block;
    }
    
    .star.filled {
        color: #fbbf24;
        filter: drop-shadow(0 2px 4px rgba(251, 191, 36, 0.4));
        animation: starGlow 2s ease-in-out infinite;
    }
    
    .star.empty {
        color: #d1d5db;
        opacity: 0.5;
    }
    
    @keyframes starGlow {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
    
    .rating-badge {
        background: var(--badge-color);
        color: white;
        font-size: 0.75rem;
        font-weight: 700;
        padding: 0.25rem 0.5rem;
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }
    
    .title-section {
        margin-bottom: 1rem;
    }
    
    .review-title {
        font-size: 1.1rem;
        font-weight: 700;
        color: #1f2937;
        margin: 0;
        line-height: 1.4;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        
        /* Text overflow handling */
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    
    .title-icon {
        font-size: 1rem;
        opacity: 0.7;
    }
    
    .content-section {
        flex: 1;
        margin-bottom: 1rem;
        position: relative;
    }
    
    .content-wrapper {
        position: relative;
        height: 100%;
    }
    
    .quote-mark {
        position: absolute;
        font-size: 2rem;
        font-weight: 900;
        color: rgba(99, 102, 241, 0.2);
        font-family: 'Times New Roman', serif;
    }
    
    .quote-mark.start {
        top: -10px;
        left: -5px;
    }
    
    .quote-mark.end {
        bottom: -20px;
        right: 0px;
        transform: rotate(180deg);
    }
    
    .review-text {
        font-size: 0.9rem;
        line-height: 1.6;
        color: #4b5563;
        margin: 0;
        padding: 0.5rem 1rem;
        height: 100%;
        
        /* Text overflow handling */
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    
    .card-footer {
        margin-top: auto;
    }
    
    .footer-decoration {
        display: flex;
        align-items: center;
        margin-bottom: 0.75rem;
        gap: 0.5rem;
    }
    
    .decoration-line {
        flex: 1;
        height: 1px;
        background: linear-gradient(90deg, 
            transparent 0%, 
            rgba(99, 102, 241, 0.3) 50%, 
            transparent 100%);
    }
    
    .decoration-center {
        color: #6366f1;
        font-size: 1rem;
        animation: decorationFloat 3s ease-in-out infinite;
    }
    
    @keyframes decorationFloat {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-3px); }
    }
    
    .engagement-stats {
        display: flex;
        justify-content: center;
        gap: 1.5rem;
    }
    
    .stat-item {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        font-size: 0.75rem;
        color: #9ca3af;
        transition: color 0.2s ease;
    }
    
    .stat-item:hover {
        color: #6366f1;
        cursor: pointer;
    }
    
    .floating-elements {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
        z-index: 1;
    }
    
    .float-element {
        position: absolute;
        font-size: 1rem;
        opacity: 0.1;
        animation: floatAnimation 6s ease-in-out infinite;
    }
    
    .element-1 {
        top: 20%;
        right: 10%;
        animation-delay: 0s;
    }
    
    .element-2 {
        top: 60%;
        left: 15%;
        animation-delay: 2s;
    }
    
    .element-3 {
        bottom: 20%;
        right: 20%;
        animation-delay: 4s;
    }
    
    @keyframes floatAnimation {
        0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
            opacity: 0.1; 
        }
        50% { 
            transform: translateY(-10px) rotate(180deg); 
            opacity: 0.2; 
        }
    }
    
    /* Responsive Design */
    @media (max-width: 768px) {
        .review-card {
            height: 300px;
        }
        
        .card-content {
            padding: 1.25rem;
        }
        
        .card-header {
            flex-direction: column;
            gap: 1rem;
            align-items: stretch;
        }
        
        .user-info {
            justify-content: space-between;
        }
        
        .rating-section {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
        }
        
        .review-title {
            font-size: 1rem;
        }
        
        .review-text {
            font-size: 0.85rem;
            -webkit-line-clamp: 3;
        }
    }
    
    /* Animation for new cards */
    .review-card {
        animation: cardEnter 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }
    
    @keyframes cardEnter {
        0% {
            opacity: 0;
            transform: translateY(30px) scale(0.9);
        }
        100% {
            opacity: 1;
            transform: translateY(0px) scale(1);
        }
    }
    
    /* Hover Effects for Interactive Elements */
    .review-card:hover .title-icon {
        animation: iconBounce 0.6s ease;
    }
    
    @keyframes iconBounce {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.2); }
    }
    
    .review-card:hover .float-element {
        opacity: 0.3;
        animation-duration: 3s;
    }
</style>