import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle, Star, Users, Target, Zap } from 'lucide-react'
import './About.css'

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) { e.target.classList.add('revealed'); io.unobserve(e.target) }
        })
      },
      { threshold: 0.12 }
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}

const pillars = [
  { icon: <Target size={22} />, title: 'Professional Environment', desc: 'Experience tournament cricket in a structured, professional setting with official umpires, scorers, and live streaming.' },
  { icon: <Star size={22} />,   title: 'Talent Discovery',          desc: 'NGPL is a platform to discover hidden talent. Outstanding performers are graded and recognized across A, B, and C tiers.' },
  { icon: <Users size={22} />,  title: 'Youth-Focused',             desc: 'Designed for the next generation of Indian cricket. Open to players 15 years and above, nurturing young stars.' },
  { icon: <Zap size={22} />,    title: 'Competitive Intensity',     desc: 'Real match pressure, real stakes. NGPL replicates the intensity of professional cricket to prepare players for higher levels.' },
]

const eligibilityPoints = [
  'Players above 15 years of age are eligible for trials',
  'Players are selected based on trial/tournament performance',
  'Grade-based selection: A Grade, B Grade, C Grade',
  'Open to Batsmen, Bowlers, All-Rounders, and Wicket Keeper-Batsmen',
  'All selected players receive official team jersey',
  'Tournament experience counts for all registered players',
]

export default function About() {
  useScrollReveal()

  return (
    <div className="about-page">

      {/* Page Header */}
      <div className="page-header">
        <div className="page-header__bg">
          <div className="page-header__orb page-header__orb--gold" />
          <div className="page-header__orb page-header__orb--blue" />
          <div className="page-header__grid" />
        </div>
        <div className="page-header__content section">
          <div className="section-label">About</div>
          <h1 className="page-header__title">
            About <span className="gold-text">NGPL</span>
          </h1>
          <p className="page-header__sub">
            Next Gen Premier League — India's premier youth cricket tournament designed to discover and develop the next generation of cricket stars.
          </p>
        </div>
      </div>

      {/* What is NGPL */}
      <section className="section about-intro">
        <div className="about-intro__grid">
          <div className="about-intro__text">
            <div className="section-label reveal">What is NGPL?</div>
            <h2 className="section-title reveal reveal-delay-1">
              A League Built for<br /><span className="gold-text">The Next Generation</span>
            </h2>
            <p className="about-para reveal reveal-delay-2">
              NGPL – Next Gen Premier League is a professional cricket tournament concept designed to bridge the gap between grassroots cricket and professional competition. We provide a structured, high-quality tournament environment that gives aspiring cricketers the platform they deserve.
            </p>
            <p className="about-para reveal reveal-delay-3">
              Every match is officiated by qualified umpires, streamed live, and commentated on. Players are graded by expert evaluators based on their performance in trials and matches — creating a fair, merit-based system that rewards talent.
            </p>
            <Link to="/register" className="btn btn-primary reveal reveal-delay-4" style={{ marginTop: '1.5rem' }}>
              Join NGPL <ArrowRight size={16} />
            </Link>
          </div>

          <div className="about-intro__visual reveal reveal-delay-2">
            <div className="about-visual-card">
              <div className="about-visual-card__inner">
                <div className="about-visual-card__ngpl">NGPL</div>
                <div className="about-visual-card__sub">Next Gen Premier League</div>
                <div className="about-visual-divider" />
                <div className="about-visual-card__tagline">Play • Compete • Be the Next Gen Star</div>
                <div className="about-visual-card__stats">
                  <div className="about-stat">
                    <span className="about-stat__val">₹61K</span>
                    <span className="about-stat__label">Winner Prize</span>
                  </div>
                  <div className="about-stat">
                    <span className="about-stat__val">15+</span>
                    <span className="about-stat__label">Age Eligible</span>
                  </div>
                  <div className="about-stat">
                    <span className="about-stat__val">3</span>
                    <span className="about-stat__label">Grade Tiers</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="section about-pillars bg-dots" style={{ paddingTop: 0 }}>
        <div className="section-label reveal">Tournament Concept</div>
        <h2 className="section-title reveal reveal-delay-1">Why We're <span className="gold-text">Different</span></h2>
        <div className="pillars-grid">
          {pillars.map((p, i) => (
            <div key={i} className={`pillar-card card reveal reveal-delay-${i + 1}`}>
              <div className="pillar-card__icon">{p.icon}</div>
              <h3 className="pillar-card__title">{p.title}</h3>
              <p className="pillar-card__desc">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Player Selection */}
      <section className="about-selection">
        <div className="section">
          <div className="section-label reveal">Player Selection</div>
          <h2 className="section-title reveal reveal-delay-1">
            How Players Are <span className="gold-text">Selected &amp; Graded</span>
          </h2>
          <div className="selection-grid">
            {[
              { num: '01', title: 'Register',  desc: 'Players register for NGPL by paying the ₹199 registration fee and filling out the registration form with their details and playing role.' },
              { num: '02', title: 'Trials',    desc: 'Players participate in organized trials at Tau Devi Lal Stadium, Gurgaon. Performance across batting, bowling, and fielding is evaluated.' },
              { num: '03', title: 'Grading',   desc: 'Based on trial performance, players are assigned to Grade A, B, or C. Each grade has its own fee structure reflecting player tier.' },
              { num: '04', title: 'Tournament',desc: 'Graded players compete in the NGPL tournament with full facilities — accommodation, jerseys, food, official umpires, and live streaming.' },
            ].map((step, i) => (
              <>
                <div key={step.num} className={`selection-step reveal reveal-delay-${i + 1}`}>
                  <div className="selection-step__num">{step.num}</div>
                  <h3 className="selection-step__title">{step.title}</h3>
                  <p className="selection-step__desc">{step.desc}</p>
                </div>
                {i < 3 && <div key={`conn-${i}`} className="selection-connector" />}
              </>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility */}
      <section className="section about-eligibility">
        <div className="about-elig__inner">
          <div>
            <div className="section-label reveal">Eligibility</div>
            <h2 className="section-title reveal reveal-delay-1">Are You <span className="gold-text">Eligible?</span></h2>
            <p className="section-subtitle reveal reveal-delay-2" style={{ marginBottom: '2rem' }}>
              NGPL is open to young, passionate cricketers who meet the following criteria:
            </p>
          </div>
          <div className="elig-list reveal reveal-delay-2">
            {eligibilityPoints.map((pt, i) => (
              <div key={i} className="elig-point">
                <CheckCircle size={17} className="elig-point__icon" />
                <span>{pt}</span>
              </div>
            ))}
          </div>
          <div className="elig-cta reveal reveal-delay-3">
            <div className="elig-cta__main">
              <span className="elig-cta__label">Minimum Age</span>
              <span className="elig-cta__value">15+ Years</span>
            </div>
            <Link to="/register" className="btn btn-primary btn-lg">
              Register Now — ₹199 <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
