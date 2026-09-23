import { Link } from 'react-router-dom'
import {
  ChevronRight, Trophy, Users, MapPin, Star,
  Zap, Shield, Award, Target, ArrowRight
} from 'lucide-react'
import './Home.css'

const highlights = [
  {
    icon: <Trophy size={28} />,
    label: 'Prize Pool',
    value: '₹1,00,400+',
    desc: 'Total prize money',
    color: 'gold',
  },
  {
    icon: <Users size={28} />,
    label: 'Eligibility',
    value: '15+ Years',
    desc: 'Players above 15 eligible',
    color: 'blue',
  },
  {
    icon: <MapPin size={28} />,
    label: 'Venue',
    value: 'Tau Devi Lal',
    desc: 'Gurgaon, Haryana',
    color: 'green',
  },
  {
    icon: <Star size={28} />,
    label: 'Registration',
    value: '₹199',
    desc: 'Affordable entry fee',
    color: 'red',
  },
]

const features = [
  {
    icon: <Zap size={24} />,
    title: 'Grade-Based Selection',
    desc: 'Professional player grading system (A, B, C) based on trial performance and skill assessment.',
  },
  {
    icon: <Shield size={24} />,
    title: 'Full Professional Setup',
    desc: 'Official umpires, match commentary, live streaming, and professional cricket equipment provided.',
  },
  {
    icon: <Award size={24} />,
    title: 'Massive Prize Pool',
    desc: 'Winner takes ₹61,000. Individual awards for Best Batsman, Bowler, Fielder & Emerging Player.',
  },
  {
    icon: <Target size={24} />,
    title: 'Complete Facilities',
    desc: 'Accommodation, jersey, food, energy drinks — everything provided for a full tournament experience.',
  },
]

const prizes = [
  { label: 'Winner', amount: '₹61,000', highlight: true },
  { label: 'Runner-up', amount: '₹25,000', highlight: false },
  { label: 'Best Batsman', amount: '₹3,100', highlight: false },
  { label: 'Best Bowler', amount: '₹3,100', highlight: false },
  { label: 'Best Emerging Player', amount: '₹5,100', highlight: false },
]

export default function Home() {
  return (
    <div className="home">

      {/* ===================== HERO ===================== */}
      <section className="hero">
        {/* Background */}
        <div className="hero__bg">
          <div className="hero__pitch" />
          <div className="hero__orb hero__orb--gold" />
          <div className="hero__orb hero__orb--blue" />
          <div className="hero__grid" />
          <div className="hero__vignette" />
        </div>

        {/* Stadium Lines Decoration */}
        <div className="hero__stadium-arc" />

        <div className="hero__content">
          {/* Badge */}
          <div className="hero__badge animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
            <Zap size={12} />
            Season 1 — Registration Open
          </div>

          {/* Logo / Title */}
          <h1 className="hero__title animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            <span className="hero__title-ngpl">NGPL</span>
            <span className="hero__title-full">Next Gen Premier League</span>
          </h1>

          {/* Tagline */}
          <p className="hero__tagline animate-fadeInUp" style={{ animationDelay: '0.35s' }}>
            <span className="hero__tagline-dot">Play</span>
            <span className="hero__tagline-sep">•</span>
            <span className="hero__tagline-dot">Compete</span>
            <span className="hero__tagline-sep">•</span>
            <span className="hero__tagline-dot">Be the Next Gen Star</span>
          </p>

          {/* Fee & Info */}
          <div className="hero__info animate-fadeInUp" style={{ animationDelay: '0.45s' }}>
            <div className="hero__fee">
              <span className="hero__fee-label">Registration Fee</span>
              <span className="hero__fee-amount">₹199</span>
            </div>
            <div className="hero__sep" />
            <div className="hero__eligibility">
              <span className="hero__eli-label">Eligibility</span>
              <span className="hero__eli-value">Players 15+ Years</span>
            </div>
            <div className="hero__sep" />
            <div className="hero__venue-info">
              <span className="hero__venue-label">Venue</span>
              <span className="hero__venue-value">Tau Devi Lal Stadium, Gurgaon</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="hero__actions animate-fadeInUp" style={{ animationDelay: '0.55s' }}>
            <Link to="/register" className="btn btn-primary btn-lg hero__btn-register">
              Register Now — ₹199
              <ArrowRight size={18} />
            </Link>
            <Link to="/about" className="btn btn-secondary btn-lg">
              Explore Tournament
              <ChevronRight size={18} />
            </Link>
          </div>

          {/* Mini stats */}
          <div className="hero__stats animate-fadeInUp" style={{ animationDelay: '0.65s' }}>
            <div className="hero__stat">
              <span className="hero__stat-value">₹61K</span>
              <span className="hero__stat-label">Winner Prize</span>
            </div>
            <div className="hero__stat-div" />
            <div className="hero__stat">
              <span className="hero__stat-value">4</span>
              <span className="hero__stat-label">Player Roles</span>
            </div>
            <div className="hero__stat-div" />
            <div className="hero__stat">
              <span className="hero__stat-value">3</span>
              <span className="hero__stat-label">Grade Tiers</span>
            </div>
            <div className="hero__stat-div" />
            <div className="hero__stat">
              <span className="hero__stat-value">8+</span>
              <span className="hero__stat-label">Facilities</span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hero__scroll">
          <div className="hero__scroll-line" />
          <span>Scroll to explore</span>
        </div>
      </section>

      {/* ===================== HIGHLIGHTS ===================== */}
      <section className="home-section home-highlights">
        <div className="section">
          <div className="section-label">Tournament Overview</div>
          <h2 className="section-title">Your Gateway to <span className="gold-text">Elite Cricket</span></h2>
          <p className="section-subtitle">
            NGPL brings professional-grade cricket experience to the next generation of players. Compete, perform, and get graded by experts.
          </p>

          <div className="highlights-grid">
            {highlights.map((h, i) => (
              <div key={i} className={`highlight-card highlight-card--${h.color}`}>
                <div className="highlight-card__icon">{h.icon}</div>
                <div className="highlight-card__body">
                  <div className="highlight-card__value">{h.value}</div>
                  <div className="highlight-card__label">{h.label}</div>
                  <div className="highlight-card__desc">{h.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== FEATURES ===================== */}
      <section className="home-section home-features bg-grid">
        <div className="section">
          <div className="section-label">Why NGPL?</div>
          <h2 className="section-title">A Tournament <span className="gold-text">Built for Champions</span></h2>

          <div className="features-grid">
            {features.map((f, i) => (
              <div key={i} className="feature-card card">
                <div className="feature-card__icon">{f.icon}</div>
                <h3 className="feature-card__title">{f.title}</h3>
                <p className="feature-card__desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== PRIZE GLIMPSE ===================== */}
      <section className="home-section home-prize-glimpse">
        <div className="section">
          <div className="prize-glimpse__inner">
            <div className="prize-glimpse__left">
              <div className="section-label">Prize Money</div>
              <h2 className="section-title">Compete for <span className="gold-text">Real Rewards</span></h2>
              <p className="section-subtitle">
                Top performers walk away with significant prize money. From the winning team to individual award winners, NGPL rewards excellence.
              </p>
              <Link to="/prizes" className="btn btn-primary" style={{ marginTop: '2rem' }}>
                View All Prizes <ArrowRight size={16} />
              </Link>
            </div>
            <div className="prize-glimpse__right">
              {prizes.map((p, i) => (
                <div key={i} className={`prize-row ${p.highlight ? 'prize-row--highlight' : ''}`}>
                  <span className="prize-row__label">{p.label}</span>
                  <span className="prize-row__amount">{p.amount}</span>
                </div>
              ))}
              <div className="prize-row prize-row--trophy">
                <span className="prize-row__label">Man of the Match</span>
                <span className="prize-row__trophy">🏆 Trophy</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== ELIGIBILITY BANNER ===================== */}
      <section className="home-section home-elig">
        <div className="section">
          <div className="elig-banner">
            <div className="elig-banner__orb" />
            <Shield size={48} className="elig-banner__icon" />
            <div className="elig-banner__text">
              <h3 className="elig-banner__title">Eligibility</h3>
              <p className="elig-banner__rule">Players above <span>15 years</span> are eligible for trials</p>
            </div>
            <Link to="/register" className="btn btn-primary btn-lg elig-banner__btn">
              Check Your Eligibility & Register
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===================== FINAL CTA ===================== */}
      <section className="home-section home-cta">
        <div className="home-cta__bg">
          <div className="home-cta__orb" />
        </div>
        <div className="section home-cta__inner">
          <div className="home-cta__badge">
            <Trophy size={14} />
            Season 1 Open
          </div>
          <h2 className="home-cta__title">Your Next Chapter<br /><span className="gold-text">Starts Here</span></h2>
          <p className="home-cta__sub">
            Join NGPL — Next Gen Premier League. Register today for just ₹199 and take your cricket career to the next level.
          </p>
          <Link to="/register" className="btn btn-primary btn-lg home-cta__btn">
            REGISTER NOW
            <ArrowRight size={20} />
          </Link>
          <p className="home-cta__note">Tau Devi Lal Stadium, Gurgaon, Haryana • 15+ years eligible</p>
        </div>
      </section>

    </div>
  )
}
