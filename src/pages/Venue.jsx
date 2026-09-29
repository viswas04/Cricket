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
          <div className="section-label">Tournament Locations</div>
          <h1 className="page-header__title">
            PLAYERS FROM <span className="gold-text">ACROSS INDIA</span>
          </h1>
          <p className="page-header__sub">
            NGPL brings together aspiring cricketers from multiple cities and regions across India.
          </p>
        </div>
      </div>

      <section className="section">

        {/* Locations Grid */}
        <div className="locations-grid reveal">
          {[
            'Visakhapatnam (Vizag)',
            'Hyderabad',
            'Bangalore',
            'Bhopal',
            'Nagpur',
            'Haryana',
            'Delhi',
            'Pune'
          ].map((loc, i) => (
            <div key={i} className="location-card">
              <MapPin size={24} className="location-card__icon" />
              <h3 className="location-card__name">{loc}</h3>
            </div>
          ))}
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
                Join the trials at any of our participating locations across India.
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
