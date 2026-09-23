import { Link } from 'react-router-dom'
import { Trophy, Instagram, Twitter, Youtube, Mail, MapPin, Phone } from 'lucide-react'
import './Footer.css'

const footerLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Categories', path: '/categories' },
  { label: 'Grades', path: '/grades' },
  { label: 'Facilities', path: '/facilities' },
  { label: 'Prizes', path: '/prizes' },
  { label: 'Venue', path: '/venue' },
  { label: 'Register', path: '/register' },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__glow" />
      <div className="footer__inner">

        {/* Brand */}
        <div className="footer__brand">
          <div className="footer__logo">
            <div className="footer__logo-icon">
              <Trophy size={20} strokeWidth={2.5} />
            </div>
            <div>
              <div className="footer__logo-ngpl">NGPL</div>
              <div className="footer__logo-sub">Next Gen Premier League</div>
            </div>
          </div>
          <p className="footer__tagline">
            Play • Compete • Be the Next Gen Star
          </p>
          <p className="footer__desc">
            India's premier youth cricket tournament. Discover, develop, and showcase your talent on a professional stage.
          </p>
          <div className="footer__socials">
            <a href="#" className="footer__social-link" aria-label="Instagram">
              <Instagram size={18} />
            </a>
            <a href="#" className="footer__social-link" aria-label="Twitter">
              <Twitter size={18} />
            </a>
            <a href="#" className="footer__social-link" aria-label="YouTube">
              <Youtube size={18} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer__col">
          <h4 className="footer__col-title">Quick Links</h4>
          <ul className="footer__nav">
            {footerLinks.map((link) => (
              <li key={link.path}>
                <Link to={link.path} className="footer__nav-link">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Tournament Info */}
        <div className="footer__col">
          <h4 className="footer__col-title">Tournament</h4>
          <ul className="footer__info-list">
            <li className="footer__info-item">
              <span className="footer__info-label">Registration Fee</span>
              <span className="footer__info-value">₹199</span>
            </li>
            <li className="footer__info-item">
              <span className="footer__info-label">Eligibility</span>
              <span className="footer__info-value">15+ Years</span>
            </li>
            <li className="footer__info-item">
              <span className="footer__info-label">Winner Prize</span>
              <span className="footer__info-value gold">₹61,000</span>
            </li>
            <li className="footer__info-item">
              <span className="footer__info-label">Venue</span>
              <span className="footer__info-value">Tau Devi Lal Stadium, Gurgaon</span>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer__col">
          <h4 className="footer__col-title">Contact</h4>
          <ul className="footer__contact-list">
            <li className="footer__contact-item">
              <MapPin size={16} />
              <span>Tau Devi Lal Stadium, Gurgaon, Haryana</span>
            </li>
            <li className="footer__contact-item">
              <Mail size={16} />
              <span>info@ngpl.in</span>
            </li>
            <li className="footer__contact-item">
              <Phone size={16} />
              <span>Contact via registration form</span>
            </li>
          </ul>
          <Link to="/register" className="btn btn-primary footer__cta">
            Register Now
          </Link>
        </div>

      </div>

      <div className="footer__bottom">
        <div className="footer__bottom-inner">
          <p className="footer__copyright">
            © {new Date().getFullYear()} NGPL – Next Gen Premier League. All rights reserved.
          </p>
          <p className="footer__legal">
            Play Fair • Play Hard • Play NGPL
          </p>
        </div>
      </div>
    </footer>
  )
}
