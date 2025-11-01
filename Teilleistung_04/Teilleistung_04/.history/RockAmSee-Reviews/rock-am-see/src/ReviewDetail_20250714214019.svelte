<!-- Reviews.svelte - بخش نمایش نظرات به شکل مدرن و زیبا -->
<script>
    import { reviews } from './stores.js';
    import Card from './Card.svelte';
    
    // Store data reactive
    $: reviewList = $reviews;
    
    // Sort reviews by date (newest first)
    $: sortedReviews = reviewList.slice().sort((a, b) => {
        return new Date(b.timestamp) - new Date(a.timestamp);
    });
    
    // Calculate statistics
    $: averageRating = reviewList.length > 0 
        ? (reviewList.reduce((sum, r) => sum + r.rating, 0) / reviewList.length).toFixed(1)
        : 0;
    
    $: positiveReviews = reviewList.filter(r => r.rating >= 4).length;
    $: excellentReviews = reviewList.filter(r => r.rating === 5).length;
    
    // Get rating distribution
    $: ratingDistribution = [1, 2, 3, 4, 5].map(rating => ({
        rating,
        count: reviewList.filter(r => r.rating === rating).length,
        percentage: reviewList.length > 0 
            ? (reviewList.filter(r => r.rating === rating).length / reviewList.length * 100).toFixed(1)
            : 0
    }));
</script>

<section class="reviews-section">
    <!-- Background Elements -->
    <div class="section-background">
        <div class="bg-gradient"></div>
        <div class="bg-pattern"></div>
        <div class="floating-music-notes">
            <div class="note note-1">🎵</div>
            <div class="note note-2">🎶</div>
            <div class="note note-3">♪</div>
            <div class="note note-4">♫</div>
            <div class="note note-5">🎼</div>
        </div>
    </div>
    
    <div class="container">
        
        <!-- Section Header -->
        <div class="section-header">
            <div class="header-content">
                <div class="header-icon">
                    <div class="icon-inner">
                        <i class="bi bi-chat-heart-fill"></i>
                    </div>
                    <div class="icon-pulse"></div>
                </div>
                
                <div class="header-text">
                    <h2 class="section-title">
                        <span class="title-gradient">تجربیات</span>
                        <span class="title-highlight">فراموش‌نشدنی</span>
                    </h2>
                    <p class="section-subtitle">
                        <span class="subtitle-icon">✨</span>
                        داستان‌های زیبای شما از فستیوال
                        <span class="subtitle-icon">✨</span>
                    </p>
                </div>
            </div>
            
            <!-- Quick Stats Banner -->
            {#if reviewList.length > 0}
                <div class="quick-stats">
                    <div class="stat-card">
                        <div class="stat-icon">📊</div>
                        <div class="stat-info">
                            <div class="stat-number">{reviewList.length}</div>
                            <div class="stat-label">نظر ثبت شده</div>
                        </div>
                    </div>
                    
                    <div class="stat-card featured">
                        <div class="stat-icon">⭐</div>
                        <div class="stat-info">
                            <div class="stat-number">{averageRating}</div>
                            <div class="stat-label">میانگین امتیاز</div>
                        </div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-icon">💚</div>
                        <div class="stat-info">
                            <div class="stat-number">{positiveReviews}</div>
                            <div class="stat-label">نظر مثبت</div>
                        </div>
                    </div>
                </div>
            {/if}
        </div>
        
        <!-- Main Content -->
        {#if reviewList.length > 0}
            
            <!-- Statistics Dashboard -->
            <div class="statistics-dashboard">
                <div class="dashboard-header">
                    <h3 class="dashboard-title">
                        <i class="bi bi-graph-up"></i>
                        آمار نظرات
                    </h3>
                </div>
                
                <div class="stats-grid">
                    <!-- Rating Distribution -->
                    <div class="stats-card rating-distribution">
                        <h4 class="card-title">توزیع امتیازات</h4>
                        <div class="rating-bars">
                            {#each ratingDistribution.reverse() as dist (dist.rating)}
                                <div class="rating-bar">
                                    <div class="bar-label">
                                        <span class="rating-text">{dist.rating} ⭐</span>
                                        <span class="rating-count">({dist.count})</span>
                                    </div>
                                    <div class="bar-container">
                                        <div class="bar-fill" 
                                             style="width: {dist.percentage}%; --bar-color: {dist.rating >= 4 ? '#22c55e' : dist.rating >= 3 ? '#eab308' : '#ef4444'}">
                                        </div>
                                    </div>
                                    <span class="bar-percentage">{dist.percentage}%</span>
                                </div>
                            {/each}
                        </div>
                    </div>
                    
                    <!-- Key Metrics -->
                    <div class="stats-card key-metrics">
                        <h4 class="card-title">نکات کلیدی</h4>
                        <div class="metrics-list">
                            <div class="metric-item">
                                <div class="metric-icon excellent">🏆</div>
                                <div class="metric-text">
                                    <strong>{excellentReviews}</strong> نظر عالی (۵ ستاره)
                                </div>
                            </div>
                            
                            <div class="metric-item">
                                <div class="metric-icon positive">👍</div>
                                <div class="metric-text">
                                    <strong>{((positiveReviews / reviewList.length) * 100).toFixed(0)}%</strong> نظرات مثبت
                                </div>
                            </div>
                            
                            <div class="metric-item">
                                <div class="metric-icon recent">🔥</div>
                                <div class="metric-text">
                                    <strong>{reviewList.filter(r => {
                                        const reviewDate = new Date(r.timestamp);
                                        const weekAgo = new Date();
                                        weekAgo.setDate(weekAgo.getDate() - 7);
                                        return reviewDate > weekAgo;
                                    }).length}</strong> نظر این هفته
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Reviews Grid -->
            <div class="reviews-grid-section">
                <div class="grid-header">
                    <h3 class="grid-title">
                        <i class="bi bi-collection"></i>
                        همه نظرات
                    </h3>
                    <div class="grid-filter">
                        <div class="filter-badge">
                            <i class="bi bi-sort-down"></i>
                            جدیدترین
                        </div>
                    </div>
                </div>
                
                <div class="reviews-grid">
                    {#each sortedReviews as review, index (review.id)}
                        <div class="grid-item" style="animation-delay: {index * 0.1}s">
                            <Card {review} />
                        </div>
                    {/each}
                </div>
            </div>
            
        {:else}
            
            <!-- Empty State -->
            <div class="empty-state">
                <div class="empty-illustration">
                    <div class="empty-icon">
                        <i class="bi bi-chat-square-dots"></i>
                    </div>
                    <div class="empty-decoration">
                        <div class="decoration-circle circle-1"></div>
                        <div class="decoration-circle circle-2"></div>
                        <div class="decoration-circle circle-3"></div>
                    </div>
                </div>
                
                <div class="empty-content">
                    <h3 class="empty-title">هنوز نظری ثبت نشده</h3>
                    <p class="empty-description">
                        اولین نفری باشید که تجربه خود را با دیگران به اشتراک می‌گذارد!
                        <br>
                        نظر شما می‌تواند برای انتخاب دیگران بسیار مؤثر باشد.
                    </p>
                    
                    <div class="empty-cta">
                        <div class="cta-badge">
                            <span class="cta-icon">🚀</span>
                            <span class="cta-text">اولین نظر را ثبت کنید!</span>
                            <span class="cta-icon">🌟</span>
                        </div>
                    </div>
                </div>
            </div>
            
        {/if}
        
    </div>
</section>

<style>
    .reviews-section {
        position: relative;
        padding: 4rem 0;
        min-height: 80vh;
        overflow: hidden;
    }
    
    .section-background {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 0;
    }
    
    .bg-gradient {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, 
            rgba(99, 102, 241, 0.03) 0%, 
            rgba(168, 85, 247, 0.05) 25%, 
            rgba(236, 72, 153, 0.03) 50%, 
            rgba(34, 197, 94, 0.05) 75%, 
            rgba(251, 146, 60, 0.03) 100%);
        background-size: 400% 400%;
        animation: gradientMove 20s ease infinite;
    }
    
    @keyframes gradientMove {
        0%, 100% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
    }
    
    .bg-pattern {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: 
            radial-gradient(circle at 25% 25%, rgba(99, 102, 241, 0.03) 1px, transparent 1px),
            radial-gradient(circle at 75% 75%, rgba(168, 85, 247, 0.03) 1px, transparent 1px);
        background-size: 60px 60px;
        animation: patternFloat 25s linear infinite;
    }
    
    @keyframes patternFloat {
        0% { background-position: 0 0, 30px 30px; }
        100% { background-position: 60px 60px, 90px 90px; }
    }
    
    .floating-music-notes {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
    }
    
    .note {
        position: absolute;
        font-size: 1.5rem;
        opacity: 0.1;
        animation: noteFloat 12s ease-in-out infinite;
    }
    
    .note-1 { top: 10%; left: 10%; animation-delay: 0s; }
    .note-2 { top: 20%; right: 15%; animation-delay: 2s; }
    .note-3 { top: 60%; left: 20%; animation-delay: 4s; }
    .note-4 { top: 70%; right: 25%; animation-delay: 6s; }
    .note-5 { top: 40%; left: 80%; animation-delay: 8s; }
    
    @keyframes noteFloat {
        0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.1; }
        50% { transform: translateY(-30px) rotate(180deg); opacity: 0.2; }
    }
    
    .container {
        position: relative;
        z-index: 2;
    }
    
    .section-header {
        text-align: center;
        margin-bottom: 3rem;
    }
    
    .header-content {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 2rem;
        margin-bottom: 2rem;
    }
    
    .header-icon {
        position: relative;
        width: 80px;
        height: 80px;
    }
    
    .icon-inner {
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #6366f1, #8b5cf6);
        border-radius: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        color: white;
        box-shadow: 0 8px 32px rgba(99, 102, 241, 0.4);
        position: relative;
        z-index: 2;
    }
    
    .icon-pulse {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, #6366f1, #8b5cf6);
        border-radius: 24px;
        animation: iconPulse 2s ease-in-out infinite;
        z-index: 1;
    }
    
    @keyframes iconPulse {
        0%, 100% { transform: scale(1); opacity: 0.7; }
        50% { transform: scale(1.1); opacity: 0.4; }
    }
    
    .header-text {
        text-align: center;
    }
    
    .section-title {
        font-size: 3rem;
        font-weight: 900;
        margin-bottom: 1rem;
        line-height: 1.1;
    }
    
    .title-gradient {
        background: linear-gradient(135deg, #6366f1, #8b5cf6);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    
    .title-highlight {
        background: linear-gradient(135deg, #ec4899, #f59e0b);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    
    .section-subtitle {
        font-size: 1.2rem;
        color: #6b7280;
        margin: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
    }
    
    .subtitle-icon {
        animation: iconSparkle 2s ease-in-out infinite;
    }
    
    @keyframes iconSparkle {
        0%, 100% { transform: scale(1) rotate(0deg); }
        50% { transform: scale(1.2) rotate(180deg); }
    }
    
    .quick-stats {
        display: flex;
        justify-content: center;
        gap: 1.5rem;
        flex-wrap: wrap;
    }
    
    .stat-card {
        background: rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(20px);
        border-radius: 20px;
        padding: 1.5rem;
        display: flex;
        align-items: center;
        gap: 1rem;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        transition: transform 0.3s ease;
        min-width: 150px;
    }
    
    .stat-card:hover {
        transform: translateY(-4px);
    }
    
    .stat-card.featured {
        background: linear-gradient(135deg, #6366f1, #8b5cf6);
        color: white;
        transform: scale(1.05);
    }
    
    .stat-icon {
        font-size: 1.5rem;
    }
    
    .stat-number {
        font-size: 1.8rem;
        font-weight: 900;
        line-height: 1;
    }
    
    .stat-label {
        font-size: 0.85rem;
        opacity: 0.8;
        font-weight: 600;
    }
    
    .statistics-dashboard {
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(20px);
        border-radius: 24px;
        padding: 2rem;
        margin-bottom: 3rem;
        box-shadow: 0 16px 48px rgba(0, 0, 0, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
    }
    
    .dashboard-header {
        text-align: center;
        margin-bottom: 2rem;
    }
    
    .dashboard-title {
        font-size: 1.5rem;
        font-weight: 700;
        color: #1f2937;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
    }
    
    .stats-grid {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 2rem;
    }
    
    .stats-card {
        background: rgba(248, 250, 252, 0.8);
        border-radius: 16px;
        padding: 1.5rem;
        border: 1px solid rgba(226, 232, 240, 0.5);
    }
    
    .card-title {
        font-size: 1.1rem;
        font-weight: 700;
        color: #1f2937;
        margin-bottom: 1rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .rating-bars {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }
    
    .rating-bar {
        display: grid;
        grid-template-columns: 80px 1fr 50px;
        align-items: center;
        gap: 1rem;
    }
    
    .bar-label {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.85rem;
        font-weight: 600;
    }
    
    .bar-container {
        height: 8px;
        background: #e5e7eb;
        border-radius: 4px;
        overflow: hidden;
    }
    
    .bar-fill {
        height: 100%;
        background: var(--bar-color);
        border-radius: 4px;
        transition: width 1s ease;
        background: linear-gradient(90deg, var(--bar-color), var(--bar-color));
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    
    .bar-percentage {
        font-size: 0.8rem;
        font-weight: 600;
        color: #6b7280;
        text-align: right;
    }
    
    .metrics-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    
    .metric-item {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 0.75rem;
        background: rgba(255, 255, 255, 0.7);
        border-radius: 12px;
        border: 1px solid rgba(226, 232, 240, 0.5);
    }
    
    .metric-icon {
        font-size: 1.2rem;
        padding: 0.5rem;
        border-radius: 8px;
    }
    
    .metric-icon.excellent { background: rgba(34, 197, 94, 0.1); }
    .metric-icon.positive { background: rgba(59, 130, 246, 0.1); }
    .metric-icon.recent { background: rgba(249, 115, 22, 0.1); }
    
    .metric-text {
        font-size: 0.9rem;
        color: #4b5563;
    }
    
    .reviews-grid-section {
        margin-top: 3rem;
    }
    
    .grid-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
    }
    
    .grid-title {
        font-size: 1.5rem;
        font-weight: 700;
        color: #1f2937;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .grid-filter {
        display: flex;
        gap: 1rem;
    }
    
    .filter-badge {
        background: rgba(99, 102, 241, 0.1);
        color: #6366f1;
        padding: 0.5rem 1rem;
        border-radius: 20px;
        font-size: 0.85rem;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        border: 1px solid rgba(99, 102, 241, 0.2);
    }
    
    .reviews-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        gap: 2rem;
    }
    
    .grid-item {
        animation: gridItemEnter 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        opacity: 0;
        transform: translateY(30px);
    }
    
    @keyframes gridItemEnter {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    /* Empty State */
    .empty-state {
        text-align: center;
        padding: 4rem 2rem;
        max-width: 600px;
        margin: 0 auto;
    }
    
    .empty-illustration {
        position: relative;
        margin-bottom: 3rem;
        display: inline-block;
    }
    
    .empty-icon {
        font-size: 4rem;
        color: #d1d5db;
        background: rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(20px);
        width: 120px;
        height: 120px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        box-shadow: 0 16px 48px rgba(0, 0, 0, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        position: relative;
        z-index: 2;
    }
    
    .empty-decoration {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
    
    .decoration-circle {
        position: absolute;
        border: 2px solid rgba(99, 102, 241, 0.1);
        border-radius: 50%;
        animation: decorationFloat 4s ease-in-out infinite;
    }
    
    .circle-1 {
        width: 140px;
        height: 140px;
        top: -10px;
        left: -10px;
        animation-delay: 0s;
    }
    
    .circle-2 {
        width: 160px;
        height: 160px;
        top: -20px;
        left: -20px;
        animation-delay: 1s;
    }
    
    .circle-3 {
        width: 180px;
        height: 180px;
        top: -30px;
        left: -30px;
        animation-delay: 2s;
    }
    
    @keyframes decorationFloat {
        0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.3; }
        50% { transform: scale(1.1) rotate(180deg); opacity: 0.1; }
    }
    
    .empty-title {
        font-size: 2rem;
        font-weight: 700;
        color: #1f2937;
        margin-bottom: 1rem;
    }
    
    .empty-description {
        font-size: 1.1rem;
        color: #6b7280;
        line-height: 1.6;
        margin-bottom: 2rem;
    }
    
    .empty-cta {
        margin-top: 2rem;
    }
    
    .cta-badge {
        display: inline-flex;
        align-items: center;
        gap: 0.75rem;
        background: linear-gradient(135deg, #6366f1, #8b5cf6);
        color: white;
        padding: 1rem 2rem;
        border-radius: 50px;
        font-weight: 700;
        box-shadow: 0 8px 32px rgba(99, 102, 241, 0.3);
        animation: ctaPulse 2s ease-in-out infinite;
    }
    
    @keyframes ctaPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
    
    /* Responsive Design */
    @media (max-width: 1024px) {
        .stats-grid {
            grid-template-columns: 1fr;
        }
        
        .reviews-grid {
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 1.5rem;
        }
    }
    
    @media (max-width: 768px) {
        .reviews-section {
            padding: 2rem 0;
        }
        
        .header-content {
            flex-direction: column;
            gap: 1rem;
        }
        
        .section-title {
            font-size: 2rem;
        }
        
        .quick-stats {
            gap: 1rem;
        }
        
        .stat-card {
            min-width: 120px;
            padding: 1rem;
        }
        
        .statistics-dashboard {
            padding: 1.5rem;
        }
        
        .reviews-grid {
            grid-template-columns: 1fr;
        }
        
        .grid-header {
            flex-direction: column;
            gap: 1rem;
            align-items: stretch;
        }
        
        .empty-icon {
            width: 100px;
            height: 100px;
            font-size: 3rem;
        }
        
        .empty-title {
            font-size: 1.5rem;
        }
    }
</style>