import { Link } from 'react-router-dom'
import { ArrowRight, Star } from 'lucide-react'
import './Grades.css'

const grades = [
  {
    grade: 'A',
    label: 'A Grade',
    fee: '₹2,000',
    tier: 'Elite',
    description: 'The highest tier. A Grade players are elite performers who demonstrated exceptional skill, consistency, and match-winning ability during trials. These players represent the finest talent in the NGPL pool.',
    traits: [
      'Exceptional trial performance',
      'Consistent across all formats',
      'Strong technical foundation',
      'High cricket IQ and game awareness',
      'Match-winning ability under pressure',
    ],
    color: 'gold',
    starCount: 3,
  },
  {
    grade: 'B',
    label: 'B Grade',
    fee: '₹2,500',
    tier: 'Advanced',
    description: 'B Grade players are highly skilled performers who showed excellent potential during trials. They combine technical ability with competitive instincts and represent the backbone of the NGPL tournament.',
    traits: [
      'Strong trial performance',
      'Good technical skills',
      'Solid match temperament',
      'High growth potential',
      'Good team contribution',
    ],
    color: 'blue',
    starCount: 2,
  },
  {
    grade: 'C',
    label: 'C Grade',
    fee: '₹3,000',
    tier: 'Competitive',
    description: 'C Grade players demonstrated good performance during trials. While still developing, these players show the competitive drive and skill set required to participate and grow in the NGPL tournament environment.',
    traits: [
      'Good trial performance',
      'Developing technical skills',
      'Competitive mindset',
      'Strong work ethic',
      'Eager to improve and compete',
    ],
    color: 'silver',
    starCount: 1,
  },
]

export default function Grades() {
  return (
    <div className="grades-page">

      <div className="page-header">
        <div className="page-header__bg">
          <div className="page-header__orb page-header__orb--gold" />
          <div className="page-header__orb page-header__orb--blue" />
          <div className="page-header__grid" />
        </div>
        <div className="page-header__content section">
          <div className="section-label">Player Grades</div>
          <h1 className="page-header__title">
            Grade-Based <span className="gold-text">Selection</span>
          </h1>
          <p className="page-header__sub">
            Players are evaluated during trials and assigned to one of three grades. Each grade reflects skill level, with fees structured accordingly.
          </p>
        </div>
      </div>

      <section className="section">
        {/* How grading works */}
        <div className="grades-intro">
          <div className="grades-intro__text">
            <div className="section-label">How It Works</div>
            <h2 className="section-title">Performance-Based <span className="gold-text">Grading</span></h2>
            <p className="section-subtitle">
              After initial registration and trials, expert selectors evaluate every player across key performance metrics. Grades are assigned objectively based on demonstrated ability — not age or experience.
            </p>
          </div>
        </div>

        {/* Grade Cards */}
        <div className="grades-grid">
          {grades.map((g, i) => (
            <div key={i} className={`grade-card grade-card--${g.color}`}>
              <div className="grade-card__header">
                <div className="grade-card__badge-wrap">
                  <div className="grade-card__letter">{g.grade}</div>
                  <div className="grade-card__tier">{g.tier}</div>
                </div>
                <div className="grade-card__stars">
                  {[...Array(3)].map((_, s) => (
                    <Star
                      key={s}
                      size={18}
                      className={`grade-card__star ${s < g.starCount ? 'grade-card__star--filled' : ''}`}
                    />
                  ))}
                </div>
              </div>

              <div className="grade-card__label">{g.label}</div>
              <div className="grade-card__fee">{g.fee}</div>
              <div className="grade-card__fee-label">Grade Participation Fee</div>

              <p className="grade-card__desc">{g.description}</p>

              <div className="grade-card__traits">
                <div className="grade-card__traits-title">Performance Indicators</div>
                {g.traits.map((t, j) => (
                  <div key={j} className="grade-card__trait">
                    <span className="grade-card__trait-dot" />
                    {t}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Note Box */}
        <div className="grades-note">
          <div className="grades-note__icon">📋</div>
          <div className="grades-note__text">
            <strong>Important:</strong> Grade assignment is made by NGPL selectors after the trial process. Initial registration fee is ₹199. Grade-specific fees are payable only after grade announcement. All grade fees include: jersey, accommodation, food, energy drinks, and match facilities.
          </div>
        </div>

        {/* CTA */}
        <div className="grades-cta">
          <h3 className="grades-cta__title">Ready to Show Your Grade?</h3>
          <p className="grades-cta__sub">Register for ₹199 and let your game speak for itself during trials.</p>
          <Link to="/register" className="btn btn-primary btn-lg">
            Register Now — ₹199 <ArrowRight size={16} />
          </Link>
        </div>
      </section>

    </div>
  )
}
