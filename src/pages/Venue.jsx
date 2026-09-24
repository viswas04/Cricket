import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, ArrowRight, Navigation } from 'lucide-react'
import './Venue.css'

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) { e.target.classList.add('revealed'); io.unobserve(e.target) }
        })
      },
      { threshold: 0.1 }
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}

export default function Venue() {
  useScrollReveal()

  return (
    <div className="venue-page">

      <div className="page-header">
        <div className="page-header__bg">
          <div className="page-header__orb page-header__orb--gold" />
          <div className="page-header__orb page-header__orb--blue" />
          <div className="page-header__grid" />
        </div>
        <div className="page-header__content section">
          <div className="section-label">Tournament Venue</div>
          <h1 className="page-header__title">
            The <span className="gold-text">Arena</span>
          </h1>
          <p className="page-header__sub">
            NGPL is proud to host its tournament at one of Haryana's premier cricket venues — Tau Devi Lal Stadium, Gurgaon.
          </p>
        </div>
      </div>

      <section className="section">

        {/* Venue Main Card */}
        <div className="venue-main-card reveal">
          <div className="venue-main-card__left">
            <div className="venue-badge">
              <MapPin size={13} /> Official Venue
            </div>
            <h2 className="venue-name">Tau Devi Lal<br />Stadium</h2>
            <div className="venue-location">
              <MapPin size={15} className="venue-location__icon" />
              <span>Gurgaon, Haryana, India</span>
            </div>
            <p className="venue-desc">
              Tau Devi Lal Stadium is a multi-purpose sports complex in Gurgaon, Haryana — offering professional-grade cricket facilities. The venue provides an ideal setting for competitive cricket, with well-maintained pitches and spectator areas that create an electric atmosphere.
            </p>
            <div className="venue-features">
              <div className="venue-feature">
                <span className="venue-feature__icon">🏟️</span>
                <span>Professional Cricket Ground</span>
              </div>
              <div className="venue-feature">
                <span className="venue-feature__icon">💡</span>
                <span>Floodlit Infrastructure</span>
              </div>
              <div className="venue-feature">
                <span className="venue-feature__icon">🅿️</span>
                <span>Ample Parking</span>
              </div>
              <div className="venue-feature">
                <span className="venue-feature__icon">🚌</span>
                <span>Accessible by Public Transport</span>
              </div>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="venue-main-card__right">
            <div className="venue-map-placeholder">
              <div className="venue-map-placeholder__bg" />
              <div className="venue-map-placeholder__inner">
                <div className="venue-map-pin">
                  <MapPin size={30} />
                </div>
                <h3 className="venue-map-placeholder__name">Tau Devi Lal Stadium</h3>
                <p className="venue-map-placeholder__loc">Gurgaon, Haryana</p>
                <a
                  href="https://www.google.com/maps/search/Tau+Devi+Lal+Stadium+Gurgaon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary venue-map-btn"
                >
                  <Navigation size={14} />
                  View on Maps
                </a>
              </div>
              <div className="venue-map-grid" />
            </div>
          </div>
        </div>

        {/* Eligibility Banner */}
        <div className="venue-elig-banner reveal">
          <div className="venue-elig-banner__content">
            <div className="venue-elig-banner__icon">🎯</div>
            <div>
              <h3 className="venue-elig-banner__title">
                Players above <span>15 years</span> are eligible for trials
              </h3>
              <p className="venue-elig-banner__sub">
                All trials and tournament matches will be held at Tau Devi Lal Stadium, Gurgaon, Haryana.
              </p>
            </div>
          </div>
          <Link to="/register" className="btn btn-primary">
            Register Now <ArrowRight size={15} />
          </Link>
        </div>

      </section>
    </div>
  )
}
