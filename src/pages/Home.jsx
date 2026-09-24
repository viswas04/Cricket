import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  ChevronRight, Trophy, Users, MapPin, Star,
  Zap, Shield, Award, Target, ArrowRight,
  Tv, Utensils, ShoppingBag, Eye, Mic
} from 'lucide-react'
import imgBatsman    from '../assets/cat_batsman.jpg'
import imgBowler     from '../assets/cat_bowler.jpg'
import imgAllrounder from '../assets/cat_allrounder.jpg'
import imgWk         from '../assets/cat_wk.jpg'

import imgAccom     from '../assets/fac_accommodation.jpg'
import imgJersey    from '../assets/fac_jersey.jpg'
import imgFood      from '../assets/fac_food.jpg'
import imgEnergy    from '../assets/fac_energy.jpg'
import imgOfficials from '../assets/fac_officials.jpg'
import imgUmpires   from '../assets/fac_umpires.jpg'
import imgComm      from '../assets/fac_commentary.jpg'
import imgStream    from '../assets/fac_streaming.jpg'

import './Home.css'

/* ── Scroll-reveal hook ── */
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('revealed')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12 }
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}

/* ── Count-up hook ── */
function useCountUp(ref, target, duration = 1600) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      io.disconnect()
      const start = Date.now()
      const tick = () => {
        const elapsed = Date.now() - start
        const progress = Math.min(elapsed / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        el.textContent = Math.floor(eased * target).toLocaleString('en-IN')
        if (progress < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, { threshold: 0.5 })
    io.observe(el)
    return () => io.disconnect()
  }, [ref, target, duration])
}

/* ── Data ── */
const highlights = [
  { icon: <Trophy size={26} />, label: 'Prize Pool', value: '₹1,00,400+', desc: 'Total prize money', color: 'gold' },
  { icon: <Users size={26} />,  label: 'Eligibility', value: '15+ Years',  desc: 'Players above 15 eligible', color: 'blue' },
  { icon: <MapPin size={26} />, label: 'Venue', value: 'Tau Devi Lal', desc: 'Gurgaon, Haryana', color: 'green' },
  { icon: <Star size={26} />,   label: 'Registration', value: '₹199',   desc: 'Affordable entry fee', color: 'red' },
]

const whyFeatures = [
  {
    icon: <Zap size={22} />,
    title: 'Competitive Cricket',
    desc: 'Real match pressure and professional intensity — NGPL replicates top-tier tournament conditions to prepare players for higher levels.',
    color: 'gold',
  },
  {
    icon: <Target size={22} />,
    title: 'Performance-Based Selection',
    desc: 'Expert selectors grade every player on merit — A, B, or C tier. No bias, no favouritism. Pure performance decides your grade.',
    color: 'blue',
  },
  {
    icon: <Tv size={22} />,
    title: 'Live Streaming',
    desc: 'All matches are streamed live so families, fans, and selectors can watch. Your best moments are captured and shared.',
    color: 'green',
  },
  {
    icon: <Award size={22} />,
    title: 'Player Opportunities',
    desc: 'Outstanding performers gain visibility, recognition, and real career opportunities. NGPL is your stage to shine.',
    color: 'red',
  },
]

const categories = [
  {
    id: 'batsman',
    title: 'Batsman',
    emoji: '🏏',
    fee: '₹1,100',
    desc: 'Run-scorers and anchors evaluated on technique, timing, and temperament.',
    color: 'batsman',
    img: imgBatsman,
    imgPosition: '55% top',
  },
  {
    id: 'bowler',
    title: 'Bowler',
    emoji: '🎯',
    fee: '₹1,100',
    desc: 'Wicket-takers assessed on accuracy, pace, variation, and ability to build pressure.',
    color: 'bowler',
    img: imgBowler,
    imgPosition: 'center top',
  },
  {
    id: 'allrounder',
    title: 'All-Rounder',
    emoji: '⚡',
    fee: '₹1,300',
    desc: 'Complete cricketers who contribute with both bat and ball.',
    color: 'allrounder',
    img: imgAllrounder,
    imgPosition: '45% top',
  },
  {
    id: 'wk',
    title: 'Wicket Keeper-Batsman',
    emoji: '🧤',
    fee: '₹1,300',
    desc: 'Backbone behind the stumps — glove work, stumpings, and batting contribution.',
    color: 'wk',
    img: imgWk,
    imgPosition: 'center 15%',
  },
]

const grades = [
  { grade: 'A', label: 'A Grade', tier: 'Elite',       fee: '₹2,000', color: 'gold',   desc: 'Exceptional performers who demonstrated elite skill, consistency, and match-winning ability during trials.' },
  { grade: 'B', label: 'B Grade', tier: 'Advanced',    fee: '₹2,500', color: 'blue',   desc: 'Highly skilled performers with excellent potential, technical ability, and competitive instincts.' },
  { grade: 'C', label: 'C Grade', tier: 'Competitive', fee: '₹3,000', color: 'silver', desc: 'Developing players with the competitive drive and skill set to grow in the NGPL environment.' },
]

const journeySteps = [
  { label: 'Register',         emoji: '📝', step: 1 },
  { label: 'Trial',            emoji: '🏏', step: 2 },
  { label: 'Player Selection', emoji: '🎯', step: 3 },
  { label: 'A / B / C Grade',  emoji: '⭐', step: 4 },
  { label: 'Tournament',       emoji: '🏟️', step: 5 },
  { label: 'Prizes',           emoji: '🏆', step: 6 },
]

const facilities = [
  { emoji: '🏨', title: 'Accommodation',  desc: 'Comfortable lodging for all players during the tournament.', img: imgAccom },
  { emoji: '👕', title: 'Official Jersey',desc: 'Every player receives an official NGPL team jersey.', img: imgJersey },
  { emoji: '🍽️', title: 'Food & Nutrition',desc: 'Nutritious meals throughout the tournament.', img: imgFood },
  { emoji: '⚡', title: 'Energy Drinks', desc: 'Professional energy drinks to keep players at peak performance.', img: imgEnergy },
  { emoji: '🦺', title: 'Match Officials',desc: 'Certified match officials ensuring fair and professional play.', img: imgOfficials },
  { emoji: '⚖️', title: 'Official Umpires',desc: 'Experienced umpires officiating all matches.', img: imgUmpires },
  { emoji: '🎙️', title: 'Commentary',    desc: 'Live match commentary adding to the professional atmosphere.', img: imgComm },
  { emoji: '📺', title: 'Live Streaming',desc: 'All matches streamed live for full visibility.', img: imgStream },
]

const mainPrizes = [
  { rank: '1st', label: 'Winner',   amount: '₹61,000', emoji: '🏆', winner: true,  desc: 'The winning team takes home the biggest prize in NGPL Season 1.' },
  { rank: '2nd', label: 'Runner-up',amount: '₹25,000', emoji: '🥈', winner: false, desc: 'The runner-up earns a significant reward for reaching the final.' },
]

const individualPrizes = [
  { label: 'Best Batsman',          amount: '₹3,100', emoji: '🏏', desc: 'Best batting performance across the tournament.' },
  { label: 'Best Bowler',           amount: '₹3,100', emoji: '🎯', desc: 'Best bowling performance across the tournament.' },
  { label: 'Best Fielder',          amount: '₹3,100', emoji: '🤸', desc: 'Most outstanding fielding contribution.' },
  { label: 'Best Emerging Player',  amount: '₹5,100', emoji: '⭐', desc: 'Exceptional promise and growth during the tournament.', highlight: true },
]

/* Particle data */
const particles = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${5 + (i * 5.5) % 90}%`,
  top:  `${10 + (i * 7) % 80}%`,
  duration: `${3 + (i % 4)}s`,
  delay:    `${(i * 0.4) % 3}s`,
}))

export default function Home() {
  useScrollReveal()

  /* count-up refs */
  const winnerRef = useRef(null)
  const poolRef   = useRef(null)
  useCountUp(winnerRef, 61000, 1800)
  useCountUp(poolRef,   100400, 2200)

  return (
    <div className="home">

      {/* ===================== HERO ===================== */}
      <section className="hero">
        <div className="hero__bg">
          <div className="hero__bg-base" />
          <div className="hero__floodlight hero__floodlight--1" />
          <div className="hero__floodlight hero__floodlight--2" />
          <div className="hero__floodlight hero__floodlight--3" />
          <div className="hero__floodlight hero__floodlight--4" />
          <div className="hero__orb hero__orb--gold" />
          <div className="hero__orb hero__orb--blue" />
          <div className="hero__orb hero__orb--mid" />
          <div className="hero__grid" />
          <div className="hero__vignette" />
          {/* Particles */}
          <div className="hero__particles">
            {particles.map(p => (
              <div
                key={p.id}
                className="hero__particle"
                style={{
                  left: p.left,
                  top:  p.top,
                  '--duration': p.duration,
                  '--delay':    p.delay,
                }}
              />
            ))}
          </div>
        </div>

        {/* Stadium arc */}
        <div className="hero__stadium-arc" />

        <div className="hero__content">
          {/* Live badge */}
          <div className="hero__badge animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
            <span className="hero__badge-dot" />
            Season 1 — Registration Open
          </div>

          {/* Title */}
          <h1 className="hero__title animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            <span className="hero__title-ngpl">NGPL</span>
            <span className="hero__title-full">Next Gen Premier League</span>
          </h1>

          {/* Tagline */}
          <p className="hero__tagline animate-fadeInUp" style={{ animationDelay: '0.32s' }}>
            <span>Play</span>
            <span className="hero__tagline-sep">•</span>
            <span>Compete</span>
            <span className="hero__tagline-sep">•</span>
            <span>Be the Next Gen Star</span>
          </p>

          {/* Registration highlight */}
          <div className="hero__reg-pill animate-fadeInUp" style={{ animationDelay: '0.42s' }}>
            <span className="hero__reg-pill-label">Registration Fee</span>
            <span className="hero__reg-pill-amount">₹199</span>
            <span className="hero__reg-pill-label">only</span>
          </div>

          {/* Info Row */}
          <div className="hero__info animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
            <div className="hero__info-item">
              <span className="hero__info-label">Registration</span>
              <span className="hero__info-value hero__info-value--gold">₹199</span>
            </div>
            <div className="hero__sep" />
            <div className="hero__info-item">
              <span className="hero__info-label">Eligibility</span>
              <span className="hero__info-value hero__info-value--sm">Players 15+ Years</span>
            </div>
            <div className="hero__sep" />
            <div className="hero__info-item">
              <span className="hero__info-label">Venue</span>
              <span className="hero__info-value hero__info-value--sm">Tau Devi Lal Stadium, Gurgaon</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="hero__actions animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
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
          <div className="hero__stats animate-fadeInUp" style={{ animationDelay: '0.7s' }}>
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
          <div className="section-label reveal">Tournament Overview</div>
          <h2 className="section-title reveal reveal-delay-1">
            Your Gateway to <span className="gold-text">Elite Cricket</span>
          </h2>
          <p className="section-subtitle reveal reveal-delay-2">
            NGPL brings professional-grade cricket to the next generation. Compete, perform, and get graded by experts.
          </p>

          <div className="highlights-strip">
            {highlights.map((h, i) => (
              <div key={i} className={`hl-card hl-card--${h.color} reveal reveal-delay-${i + 1}`}>
                <div className="hl-card__icon">{h.icon}</div>
                <div className="hl-card__body">
                  <div className="hl-card__value">{h.value}</div>
                  <div className="hl-card__label">{h.label}</div>
                  <div className="hl-card__desc">{h.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== WHY NGPL ===================== */}
      <section className="home-section home-why bg-grid">
        <div className="home-why__orb" />
        <div className="section">
          <div className="section-label reveal">Why NGPL?</div>
          <h2 className="section-title reveal reveal-delay-1">
            A Tournament <span className="gold-text">Built for Champions</span>
          </h2>
          <div className="why-grid">
            {whyFeatures.map((f, i) => (
              <div key={i} className={`why-card why-card--${f.color} reveal reveal-delay-${i + 1}`}>
                <div className="why-card__icon-wrap">{f.icon}</div>
                <h3 className="why-card__title">{f.title}</h3>
                <p className="why-card__desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== PLAYER CATEGORIES ===================== */}
      <section className="home-section home-categories">
        <div className="section">
          <div className="section-label reveal">Player Categories</div>
          <h2 className="section-title reveal reveal-delay-1">
            Choose Your <span className="gold-text">Role</span>
          </h2>
          <p className="section-subtitle reveal reveal-delay-2">
            Register in your playing category. Each role has specific evaluation criteria and a dedicated fee structure.
          </p>

          <div className="categories-grid-home">
            {categories.map((cat, i) => (
              <div
                key={cat.id}
                className={`cat-card-home cat-card-home--${cat.color} reveal reveal-delay-${i + 1}`}
              >
                {/* Layer 1: Player image — fades in on hover */}
                <img
                  src={cat.img}
                  alt={cat.title}
                  className="cat-card-home__img"
                  loading="lazy"
                  draggable="false"
                />

                {/* Layer 2: Cinematic gradient overlay — always present */}
                <div className="cat-card-home__overlay" />

                {/* Layer 3: Card content — sits above image + overlay */}
                <div className="cat-card-home__content">
                  <span className="cat-card-home__sport-icon">{cat.emoji}</span>
                  <h3 className="cat-card-home__title">{cat.title}</h3>
                  <div className="cat-card-home__fee">{cat.fee}</div>
                  <div className="cat-card-home__fee-label">Participation Fee</div>
                  <p className="cat-card-home__desc">{cat.desc}</p>
                  <Link to="/categories" className="btn btn-secondary btn-sm cat-card-home__cta">
                    Learn More <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link to="/categories" className="btn btn-primary">
              View All Categories <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===================== PLAYER GRADES ===================== */}
      <section className="home-section home-grades">
        <div className="home-grades__bg-orb-gold" />
        <div className="home-grades__bg-orb-blue" />
        <div className="section">
          <div className="section-label reveal">Player Grades</div>
          <h2 className="section-title reveal reveal-delay-1">
            Grade-Based <span className="gold-text">Selection System</span>
          </h2>
          <p className="section-subtitle reveal reveal-delay-2">
            After trials, expert selectors assign you to A, B, or C grade based purely on performance. Each grade earns you a full tournament experience.
          </p>

          <div className="grades-grid-home">
            {grades.map((g, i) => (
              <div key={g.grade} className={`grade-card-home grade-card-home--${g.color} reveal reveal-delay-${i + 1}`}>
                <div className={`grade-badge-circle grade-badge-circle--${g.color}`}>
                  <span className="grade-badge-circle__letter">{g.grade}</span>
                </div>
                <div className="grade-card-home__tier">{g.tier}</div>
                <div className="grade-card-home__label">{g.label}</div>
                <div className="grade-card-home__fee">{g.fee}</div>
                <div className="grade-card-home__fee-label">Grade Participation Fee</div>
                <p className="grade-card-home__desc">{g.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link to="/grades" className="btn btn-secondary">
              Learn About Grading <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===================== PLAYER JOURNEY ===================== */}
      <section className="home-section home-journey">
        <div className="home-journey__bg" />
        <div className="section">
          <div className="section-label reveal">Your Path</div>
          <h2 className="section-title reveal reveal-delay-1">
            The Player <span className="gold-text">Journey</span>
          </h2>
          <p className="section-subtitle reveal reveal-delay-2">
            From registration to winning — this is your roadmap to becoming an NGPL star.
          </p>

          <div className="journey-timeline reveal reveal-delay-3">
            {journeySteps.map((step, i) => (
              <>
                <div key={step.step} className="journey-step">
                  <div className="journey-step__circle">{step.emoji}</div>
                  <div className="journey-step__label">{step.label}</div>
                </div>
                {i < journeySteps.length - 1 && (
                  <div key={`conn-${i}`} className="journey-connector" />
                )}
              </>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== FACILITIES ===================== */}
      <section className="home-section home-facilities">
        <div className="section">
          <div className="section-label reveal">Facilities</div>
          <h2 className="section-title reveal reveal-delay-1">
            Everything <span className="gold-text">Included</span>
          </h2>
          <p className="section-subtitle reveal reveal-delay-2">
            All facilities are included with your grade registration. No hidden costs, no extra charges.
          </p>

          <div className="facilities-grid-home">
            {facilities.map((f, i) => (
              <div key={i} className={`facility-card-home reveal reveal-delay-${(i % 4) + 1}`}>
                {/* Layer 1: Facility image */}
                <img src={f.img} alt={f.title} className="facility-card-home__img" loading="lazy" draggable="false" />
                
                {/* Layer 2: Cinematic gradient overlay */}
                <div className="facility-card-home__overlay" />
                
                {/* Layer 3: Card content */}
                <div className="facility-card-home__content">
                  <div className="facility-card-home__emoji">{f.emoji}</div>
                  <h3 className="facility-card-home__title">{f.title}</h3>
                  <p className="facility-card-home__desc">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link to="/facilities" className="btn btn-secondary">
              View All Facilities <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===================== PRIZE MONEY ===================== */}
      <section className="home-section home-prizes">
        <div className="home-prizes__orb" />
        <div className="section">
          <div className="section-label reveal">Prize Money</div>
          <h2 className="section-title reveal reveal-delay-1">
            Compete for <span className="gold-text">Real Rewards</span>
          </h2>

          {/* Total Pool */}
          <div className="prizes-pool-display reveal reveal-delay-2">
            <div className="prizes-pool-display__icon">🏆</div>
            <div className="prizes-pool-display__label">Total Prize Pool</div>
            <div className="prizes-pool-display__amount">
              ₹<span ref={poolRef}>1,00,400</span>+
            </div>
            <div className="prizes-pool-display__sub">Across all team and individual awards</div>
          </div>

          {/* Main prizes */}
          <div className="prizes-main-grid">
            {mainPrizes.map((p, i) => (
              <div key={i} className={`prize-card-main prize-card-main--${p.winner ? 'winner' : 'runner'} reveal reveal-delay-${i + 1}`}>
                <div className="prize-card-main__rank">{p.rank} Place</div>
                <span className="prize-card-main__emoji">{p.emoji}</span>
                <div className="prize-card-main__label">{p.label}</div>
                <div className="prize-card-main__amount">{p.amount}</div>
                <p className="prize-card-main__desc">{p.desc}</p>
              </div>
            ))}
          </div>

          {/* Individual prizes */}
          <div className="prizes-individual-grid">
            {individualPrizes.map((p, i) => (
              <div key={i} className={`prize-ind-card ${p.highlight ? 'prize-ind-card--highlight' : ''} reveal reveal-delay-${i + 1}`}>
                <span className="prize-ind-card__emoji">{p.emoji}</span>
                <div className="prize-ind-card__label">{p.label}</div>
                <div className="prize-ind-card__amount">{p.amount}</div>
                <p className="prize-ind-card__desc">{p.desc}</p>
              </div>
            ))}
          </div>

          {/* MoTM */}
          <div className="prize-motm reveal reveal-delay-5">
            <span className="prize-motm__emoji">🏅</span>
            <div>
              <div className="prize-motm__label">Man of the Match</div>
              <p className="prize-motm__desc">Awarded after every match to the player with the most impactful individual performance.</p>
            </div>
            <div className="prize-motm__reward">
              <span className="prize-motm__reward-label">Award</span>
              <span className="prize-motm__reward-value">🏆 Trophy</span>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link to="/prizes" className="btn btn-primary">
              View Prize Details <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===================== VENUE ===================== */}
      <section className="home-section home-venue">
        <div className="section">
          <div className="section-label reveal">Tournament Venue</div>
          <h2 className="section-title reveal reveal-delay-1">
            The <span className="gold-text">Arena</span>
          </h2>

          <div className="venue-card-home reveal reveal-delay-2">
            {/* Left */}
            <div>
              <div className="venue-badge">
                <MapPin size={13} /> Official Venue
              </div>
              <h3 className="venue-name-home">Tau Devi Lal<br />Stadium</h3>
              <div className="venue-location-home">
                <MapPin size={15} className="venue-location-icon" />
                <span>Gurgaon, Haryana, India</span>
              </div>
              <p className="venue-desc-home">
                Tau Devi Lal Stadium is a professional sports complex in Gurgaon, Haryana — offering professional-grade cricket facilities, well-maintained pitches, and spectator areas that create an electric atmosphere.
              </p>
              <div className="venue-features-home">
                {[
                  { emoji: '🏟️', label: 'Professional Cricket Ground' },
                  { emoji: '💡', label: 'Floodlit Infrastructure' },
                  { emoji: '🅿️', label: 'Ample Parking' },
                  { emoji: '🚌', label: 'Accessible by Public Transport' },
                ].map((feat, i) => (
                  <div key={i} className="venue-feat">
                    <span className="venue-feat__icon">{feat.emoji}</span>
                    <span>{feat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <div className="venue-map-placeholder-home">
              <div className="venue-map-placeholder-home__grid" />
              <div className="venue-map-placeholder-home__inner">
                <div className="venue-map-pin-home">
                  <MapPin size={28} />
                </div>
                <div className="venue-map-name">Tau Devi Lal Stadium</div>
                <div className="venue-map-loc">Gurgaon, Haryana</div>
                <a
                  href="https://www.google.com/maps/search/Tau+Devi+Lal+Stadium+Gurgaon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                  style={{ marginTop: '0.75rem', padding: '0.6rem 1.25rem', fontSize: '0.78rem' }}
                >
                  View on Maps <ArrowRight size={13} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== ELIGIBILITY BANNER ===================== */}
      <section className="home-section home-elig">
        <div className="section">
          <div className="elig-banner-home reveal">
            <div className="elig-banner-home__orb" />
            <Shield size={48} className="elig-banner-home__icon" />
            <div className="elig-banner-home__text">
              <h3 className="elig-banner-home__title">Eligibility</h3>
              <p className="elig-banner-home__rule">
                Players above <span>15 years</span> are eligible for trials
              </p>
            </div>
            <Link to="/register" className="btn btn-primary btn-lg elig-banner-home__btn">
              Register Now — ₹199
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===================== FINAL CTA ===================== */}
      <section className="home-section home-cta">
        <div className="home-cta__bg" />
        <div className="home-cta__grid" />
        <div className="home-cta__orb" />
        <div className="section home-cta__inner">
          <div className="home-cta__badge reveal">
            <Trophy size={13} />
            Season 1 Open
          </div>
          <h2 className="home-cta__title reveal reveal-delay-1">
            Your Next Chapter<br /><span className="gold-text">Starts Here</span>
          </h2>
          <p className="home-cta__sub reveal reveal-delay-2">
            Join NGPL — Next Gen Premier League. Register today for just ₹199 and take your cricket career to the next level.
          </p>
          <Link to="/register" className="btn btn-primary btn-lg home-cta__btn reveal reveal-delay-3">
            REGISTER NOW
            <ArrowRight size={20} />
          </Link>
          <p className="home-cta__note reveal reveal-delay-4">
            Tau Devi Lal Stadium, Gurgaon, Haryana • 15+ years eligible
          </p>
        </div>
      </section>

    </div>
  )
}
