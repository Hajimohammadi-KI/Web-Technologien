<!-- Header.svelte - Header component with festival logo, title and subtitle -->
<script>
  // No reactive state needed for static header content
</script>

<header class="header-section">
  <div class="container">
    <div class="row align-items-center justify-content-center text-center py-5">
      <div class="col-12">
        <!-- Festival Logo -->
       <!-- Festival Logo (replaced with LEGO image) -->
<div class="logo-container mb-4">
  <div class="festival-logo">
    <img src="/img/LEGO.png" alt="LEGO Logo" style="max-height: 100px; object-fit: contain;" />
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