<!-- Header.svelte - Header component with festival logo, title and subtitle -->
<script>
  // No reactive state needed for static header content
</script>

<header class="header-section">
  <div class="container">
    <div class="row align-items-center justify-content-center text-center py-5">
      <div class="col-12">
        <!-- Festival Logo -->
        <div class="logo-container mb-4">
          <div class="festival-logo">
            <svg width="80" height="80" viewBox="0 0 100 100" class="logo-svg">
              <circle cx="50" cy="50" r="45" fill="#FFD700" stroke="#FF6B35" stroke-width="3"/>
              <path d="M25 60 L35 40 L45 60 L55 35 L65 60 L75 45" stroke="#FF6B35" stroke-width="4" fill="none"/>
              <circle cx="50" cy="25" r="8" fill="#FF6B35"/>
              <text x="50" y="85" text-anchor="middle" fill="#FF6B35" font-size="12" font-weight="bold">2025</text>
            </svg>
          </div>
        </div>
        
        <!-- Main Title -->
        <h1 class="main-title mb-3">
          Erfahrungsberichte Rock am See 2025
        </h1>
        
        <!-- Subtitle -->
        <p class="subtitle">
          Teilt eure Erfahrungen mit uns und den anderen Besucher:innen
        </p>
      </div>
    </div>
  </div>
</header>

<style>
  .header-section {
    background: linear-gradient(135deg, rgba(255, 107, 53, 0.9) 0%, rgba(255, 215, 0, 0.8) 100%);
    color: white;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .logo-container {
    display: flex;
    justify-content: center;
  }
  
  .festival-logo {
    animation: float 3s ease-in-out infinite;
  }
  
  .logo-svg {
    filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
  }
  
  .main-title {
    font-size: 2.5rem;
    font-weight: 700;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    margin-bottom: 1rem;
  }
  
  .subtitle {
    font-size: 1.2rem;
    font-weight: 300;
    opacity: 0.95;
    margin-bottom: 0;
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  
  @media (max-width: 768px) {
    .main-title {
      font-size: 2rem;
    }
    
    .subtitle {
      font-size: 1rem;
    }
    
    .logo-svg {
      width: 60px;
      height: 60px;
    }
  }
</style>