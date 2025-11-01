<!-- Header.svelte - هدر مدرن و زیبا -->
<header class="festival-header">
    <div class="header-background">
        <div class="gradient-overlay"></div>
        <div class="pattern-overlay"></div>
        <div class="floating-elements">
            <div class="element element-1">🎸</div>
            <div class="element element-2">🎵</div>
            <div class="element element-3">🎤</div>
            <div class="element element-4">🥁</div>
            <div class="element element-5">🎹</div>
            <div class="element element-6">⭐</div>
        </div>
    </div>
    
    <div class="container">
        <div class="row align-items-center justify-content-center">
            <div class="col-12">
                <div class="header-content">
                    
                    <!-- Festival Logo -->
                    <div class="logo-section">
                        <div class="main-logo">
                            <div class="logo-inner">
                                <div class="logo-icon">🎸</div>
                                <div class="logo-pulse"></div>
                            </div>
                        </div>
                        <div class="logo-ring"></div>
                        <div class="logo-glow"></div>
                    </div>
                    
                    <!-- Title Section -->
                    <div class="title-section">
                        <h1 class="main-title">
                            <span class="title-part title-rock">Rock</span>
                            <span class="title-part title-am">am</span>
                            <span class="title-part title-see">See</span>
                            <span class="year">2025</span>
                        </h1>
                        
                        <div class="subtitle-wrapper">
                            <div class="subtitle-decoration left"></div>
                            <p class="subtitle">
                                <span class="subtitle-icon">✨</span>
                                تجربیات فراموش‌نشدنی خود را با ما به اشتراک بگذارید
                                <span class="subtitle-icon">✨</span>
                            </p>
                            <div class="subtitle-decoration right"></div>
                        </div>
                        
                        <div class="header-stats">
                            <div class="stat-item">
                                <div class="stat-icon">🎭</div>
                                <div class="stat-text">بهترین فستیوال</div>
                            </div>
                            <div class="stat-divider"></div>
                            <div class="stat-item">
                                <div class="stat-icon">🌊</div>
                                <div class="stat-text">کنار دریاچه زیبا</div>
                            </div>
                            <div class="stat-divider"></div>
                            <div class="stat-item">
                                <div class="stat-icon">🎶</div>
                                <div class="stat-text">موسیقی بی‌نظیر</div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
    
    <!-- Wave Decoration -->
    <div class="wave-decoration">
        <svg viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,60 C150,120 350,0 600,60 C850,120 1050,0 1200,60 L1200,120 L0,120 Z" 
                  fill="rgba(255,255,255,0.1)" />
        </svg>
    </div>
</header>

<style>
    .festival-header {
        position: relative;
        padding: 4rem 0;
        overflow: hidden;
        min-height: 60vh;
        display: flex;
        align-items: center;
    }
    
    .header-background {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, 
            #667eea 0%, 
            #764ba2 25%, 
            #f093fb 50%, 
            #f5576c 75%, 
            #4facfe 100%);
        background-size: 400% 400%;
        animation: gradientShift 15s ease infinite;
    }
    
    @keyframes gradientShift {
        0%, 100% { background-position: 0% 50%; }
        25% { background-position: 100% 50%; }
        50% { background-position: 100% 100%; }
        75% { background-position: 0% 100%; }
    }
    
    .gradient-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(45deg, 
            rgba(0, 0, 0, 0.2) 0%, 
            transparent 50%, 
            rgba(255, 255, 255, 0.1) 100%);
    }
    
    .pattern-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: 
            radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
        background-size: 50px 50px;
        animation: patternMove 20s linear infinite;
    }
    
    @keyframes patternMove {
        0% { background-position: 0 0, 25px 25px; }
        100% { background-position: 50px 50px, 75px 75px; }
    }
    
    .floating-elements {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
    }
    
    .element {
        position: absolute;
        font-size: 2rem;
        opacity: 0.3;
        animation: float 8s ease-in-out infinite;
    }
    
    .element-1 { top: 20%; left: 10%; animation-delay: 0s; }
    .element-2 { top: 30%; right: 15%; animation-delay: 1s; }
    .element-3 { top: 70%; left: 20%; animation-delay: 2s; }
    .element-4 { top: 60%; right: 25%; animation-delay: 3s; }
    .element-5 { top: 40%; left: 80%; animation-delay: 4s; }
    .element-6 { top: 80%; right: 10%; animation-delay: 5s; }
    
    @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(180deg); }
    }
    
    .header-content {
        position: relative;
        z-index: 10;
        text-align: center;
        color: white;
    }
    
    .logo-section {
        position: relative;
        margin-bottom: 3rem;
        display: inline-block;
    }
    
    .main-logo {
        position: relative;
        width: 120px;
        height: 120px;
        margin: 0 auto;
    }
    
    .logo-inner {
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.2), 
            rgba(255, 255, 255, 0.1));
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        backdrop-filter: blur(20px);
        border: 2px solid rgba(255, 255, 255, 0.3);
        position: relative;
        z-index: 3;
        box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.4);
    }
    
    .logo-icon {
        font-size: 3rem;
        filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
        animation: logoSpin 10s linear infinite;
    }
    
    @keyframes logoSpin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .logo-pulse {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 50%;
        background: linear-gradient(135deg, #ff6b6b, #4ecdc4);
        opacity: 0.6;
        animation: pulse 2s ease-in-out infinite;
    }
    
    @keyframes pulse {
        0%, 100% { transform: scale(1); opacity: 0.6; }
        50% { transform: scale(1.1); opacity: 0.3; }
    }
    
    .logo-ring {
        position: absolute;
        top: -10px;
        left: -10px;
        right: -10px;
        bottom: -10px;
        border: 2px solid rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        animation: rotate 15s linear infinite;
        z-index: 1;
    }
    
    @keyframes rotate {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .logo-glow {
        position: absolute;
        top: -20px;
        left: -20px;
        right: -20px;
        bottom: -20px;
        background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
        border-radius: 50%;
        animation: glow 3s ease-in-out infinite;
        z-index: 0;
    }
    
    @keyframes glow {
        0%, 100% { opacity: 0.5; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.1); }
    }
    
    .title-section {
        max-width: 800px;
        margin: 0 auto;
    }
    
    .main-title {
        font-size: 4.5rem;
        font-weight: 900;
        margin-bottom: 2rem;
        text-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
        line-height: 1.1;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        gap: 1rem;
    }
    
    .title-part {
        display: inline-block;
        animation: titleFloat 3s ease-in-out infinite;
    }
    
    .title-rock {
        background: linear-gradient(135deg, #ff6b6b, #ff8e53);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        animation-delay: 0s;
    }
    
    .title-am {
        background: linear-gradient(135deg, #4ecdc4, #44a08d);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        animation-delay: 0.2s;
    }
    
    .title-see {
        background: linear-gradient(135deg, #a8edea, #fed6e3);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        animation-delay: 0.4s;
    }
    
    .year {
        font-size: 2.5rem;
        background: linear-gradient(135deg, #ffd89b, #19547b);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        animation-delay: 0.6s;
    }
    
    @keyframes titleFloat {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
    
    .subtitle-wrapper {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 2.5rem;
        gap: 1rem;
    }
    
    .subtitle-decoration {
        flex: 1;
        height: 2px;
        background: linear-gradient(90deg, 
            transparent 0%, 
            rgba(255, 255, 255, 0.5) 50%, 
            transparent 100%);
        max-width: 100px;
    }
    
    .subtitle {
        font-size: 1.3rem;
        font-weight: 500;
        margin: 0;
        text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        opacity: 0.95;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        white-space: nowrap;
        padding: 0 1rem;
    }
    
    .subtitle-icon {
        animation: sparkle 2s ease-in-out infinite;
    }
    
    @keyframes sparkle {
        0%, 100% { transform: scale(1) rotate(0deg); }
        50% { transform: scale(1.2) rotate(180deg); }
    }
    
    .header-stats {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 2rem;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(20px);
        border-radius: 50px;
        padding: 1rem 2rem;
        border: 1px solid rgba(255, 255, 255, 0.2);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        display: inline-flex;
    }
    
    .stat-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.95rem;
        font-weight: 600;
    }
    
    .stat-icon {
        font-size: 1.2rem;
        animation: bounce 2s ease-in-out infinite;
    }
    
    .stat-item:nth-child(1) .stat-icon { animation-delay: 0s; }
    .stat-item:nth-child(3) .stat-icon { animation-delay: 0.5s; }
    .stat-item:nth-child(5) .stat-icon { animation-delay: 1s; }
    
    @keyframes bounce {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-5px); }
    }
    
    .stat-divider {
        width: 1px;
        height: 20px;
        background: rgba(255, 255, 255, 0.3);
    }
    
    .wave-decoration {
        position: absolute;
        bottom: -1px;
        left: 0;
        right: 0;
        height: 120px;
        overflow: hidden;
    }
    
    .wave-decoration svg {
        width: 100%;
        height: 100%;
        animation: wave 3s ease-in-out infinite;
    }
    
    @keyframes wave {
        0%, 100% { transform: translateX(0px); }
        50% { transform: translateX(-50px); }
    }
    
    /* Responsive Design */
    @media (max-width: 768px) {
        .festival-header {
            padding: 3rem 0;
            min-height: 50vh;
        }
        
        .main-logo {
            width: 100px;
            height: 100px;
        }
        
        .logo-icon {
            font-size: 2.5rem;
        }
        
        .main-title {
            font-size: 3rem;
            flex-direction: column;
            gap: 0.5rem;
        }
        
        .year {
            font-size: 2rem;
        }
        
        .subtitle {
            font-size: 1.1rem;
            text-align: center;
            white-space: normal;
        }
        
        .subtitle-decoration {
            display: none;
        }
        
        .header-stats {
            flex-direction: column;
            gap: 1rem;
            padding: 1.5rem;
        }
        
        .stat-divider {
            width: 80%;
            height: 1px;
        }
    }
    
    @media (max-width: 480px) {
        .main-title {
            font-size: 2.5rem;
        }
        
        .year {
            font-size: 1.8rem;
        }
        
        .subtitle {
            font-size: 1rem;
            padding: 0;
        }
        
        .header-stats {
            padding: 1rem;
            gap: 0.8rem;
        }
        
        .stat-item {
            font-size: 0.85rem;
        }
    }
</style>