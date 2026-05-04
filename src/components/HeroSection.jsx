import './HeroSection.css'

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12 5 19 12 12 19"/>
    </svg>
  )
}

export default function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-inner">

        {/* ── Left ── */}
        <div className="hero-content">
          <a href="#" className="hero-badge">
            <span className="hero-badge-dot" />
            Freshly prepared · Delivered daily
          </a>

          <h1 className="hero-headline">
            <span className="hero-headline-plain">Simplifying</span>
            <span className="hero-headline-serif">Healthy</span>
            <span className="hero-headline-plain">Eating</span>
          </h1>

          <p className="hero-sub">
            Nutritionist-crafted meals made with real ingredients —
            designed to fuel your body without compromising on taste.
          </p>

          <div className="hero-cta">
            <button className="hero-btn-primary">
              Order now <ArrowRight />
            </button>
            <button className="hero-btn-secondary">
              View menu
            </button>
          </div>

          <div className="hero-trust">
            <span>No preservatives</span>
            <span className="hero-trust-divider" />
            <span>Macro-tracked</span>
            <span className="hero-trust-divider" />
            <span>Chef prepared</span>
          </div>
        </div>

        {/* ── Right ── */}
        <div className="hero-image-wrap">
          <img
            src="https://images.unsplash.com/photo-1547592180-85f173990554?w=900&q=85"
            alt="Healthy meal spread"
          />
          <div className="hero-float-pill">
            <span className="hero-float-pill-label">Today's special</span>
            <span className="hero-float-pill-value">Grilled Chicken Bowl</span>
          </div>
        </div>

      </div>
    </section>
  )
}
