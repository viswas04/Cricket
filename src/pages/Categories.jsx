import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Star } from 'lucide-react'
import './Categories.css'

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

const categories = [
  {
    id: 'batsman',
    title: 'Batsman',
    fee: '₹1,100',
    emoji: '🏏',
    description: 'The run-scorers and anchor of the team. Batsmen are evaluated on technique, timing, temperament under pressure, and ability to build and accelerate an innings.',
    skills: ['Opening Batting', 'Middle-Order Anchoring', 'Power Hitting', 'Running Between Wickets'],
    color: 'gold',
  },
  {
    id: 'bowler',
    title: 'Bowler',
    fee: '₹1,100',
    emoji: '🎯',
    description: 'The wicket-takers and economy specialists. Bowlers are assessed on accuracy, pace, variation, and their ability to build pressure and take crucial wickets.',
    skills: ['Fast Bowling', 'Swing & Seam', 'Spin Bowling', 'Death Bowling'],
    color: 'blue',
  },
  {
    id: 'allrounder',
    title: 'All-Rounder',
    fee: '₹1,300',
    emoji: '⚡',
    description: 'The complete cricketer. All-rounders contribute significantly with both bat and ball, making them invaluable assets for team balance and match-winning performances.',
    skills: ['Batting & Bowling', 'Match Awareness', 'Fielding Excellence', 'Leadership Skills'],
    color: 'green',
    featured: true,
  },
  {
    id: 'wk-batsman',
    title: 'Wicket Keeper-Batsman',
    fee: '₹1,300',
    emoji: '🧤',
    description: 'The backbone behind the stumps. WK-Batsmen are evaluated on glove work, positioning, stumpings, catches, and their contribution to the batting lineup.',
    skills: ['Keeping Skills', 'Stumping Reflexes', 'Batting Contribution', 'Field Positioning'],
    color: 'red',
    featured: true,
  },
]

export default function Categories() {
  useScrollReveal()

  return (
    <div className="categories-page">

      <div className="page-header">
        <div className="page-header__bg">
          <div className="page-header__orb page-header__orb--gold" />
          <div className="page-header__orb page-header__orb--blue" />
          <div className="page-header__grid" />
        </div>
        <div className="page-header__content section">
          <div className="section-label">Player Categories</div>
          <h1 className="page-header__title">
            Choose Your <span className="gold-text">Role</span>
          </h1>
          <p className="page-header__sub">
            Register in your playing category. Each role has specific evaluation criteria. Select the one that best represents your game.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="categories-grid">
          {categories.map((cat, i) => (
            <div key={cat.id} className={`cat-card cat-card--${cat.color} ${cat.featured ? 'cat-card--featured' : ''} reveal reveal-delay-${(i % 3) + 1}`}>
              {cat.featured && <div className="cat-card__badge">Most Popular</div>}

              <div className="cat-card__header">
                <div className="cat-card__emoji">{cat.emoji}</div>
                <div>
                  <h3 className="cat-card__title">{cat.title}</h3>
                  <div className="cat-card__fee">{cat.fee}</div>
                  <div className="cat-card__fee-label">Registration + Grading Fee</div>
                </div>
              </div>

              <p className="cat-card__desc">{cat.description}</p>

              <div className="cat-card__skills">
                <div className="cat-card__skills-label">Evaluation Focus</div>
                {cat.skills.map((s, j) => (
                  <div key={j} className="cat-card__skill">
                    <span className="cat-card__skill-dot" />
                    {s}
                  </div>
                ))}
              </div>

              <Link
                to="/register"
                className={`btn ${cat.featured ? 'btn-primary' : 'btn-secondary'} cat-card__btn`}
              >
                Register as {cat.title} <ArrowRight size={15} />
              </Link>
            </div>
          ))}
        </div>

        {/* Note */}
        <div className="categories-note reveal">
          <div className="categories-note__icon">ℹ️</div>
          <p>
            <strong>Note:</strong> The category fee shown is the player participation fee after grade selection. Initial registration requires a ₹199 entry fee. Final grade fee (A: ₹2,000 / B: ₹2,500 / C: ₹3,000) is paid post-trial.
          </p>
        </div>
      </section>

    </div>
  )
}
