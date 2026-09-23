import { Link } from 'react-router-dom'
import { ArrowRight, Trophy } from 'lucide-react'
import './Prizes.css'

const mainPrizes = [
  {
    rank: '1st',
    label: 'Winner',
    amount: '₹61,000',
    emoji: '🏆',
    highlight: true,
    desc: 'The winning team takes home the biggest prize in NGPL Season 1.',
  },
  {
    rank: '2nd',
    label: 'Runner-up',
    amount: '₹25,000',
    emoji: '🥈',
    highlight: false,
    desc: 'The runner-up team earns a significant reward for reaching the final.',
  },
]

const individualPrizes = [
  {
    label: 'Best Batsman',
    amount: '₹3,100',
    emoji: '🏏',
    desc: 'Awarded to the player with the best batting performance across the tournament.',
  },
  {
    label: 'Best Bowler',
    amount: '₹3,100',
    emoji: '🎯',
    desc: 'Awarded to the player who excelled most with the ball throughout the tournament.',
  },
  {
    label: 'Best Fielder',
    amount: '₹3,100',
    emoji: '🤸',
    desc: 'Recognizes the player who contributed most in the field through catches, run-outs, and athleticism.',
  },
  {
    label: 'Best Emerging Player',
    amount: '₹5,100',
    emoji: '⭐',
    desc: 'The standout young player who showed exceptional promise and growth during the tournament.',
    highlight: true,
  },
]

const trophy = {
  label: 'Man of the Match',
  reward: 'Trophy',
  emoji: '🏅',
  desc: 'Awarded after every match to the player with the most impactful individual performance.',
}

export default function Prizes() {
  return (
    <div className="prizes-page">

      <div className="page-header">
        <div className="page-header__bg">
          <div className="page-header__orb page-header__orb--gold" />
          <div className="page-header__orb page-header__orb--blue" />
          <div className="page-header__grid" />
        </div>
        <div className="page-header__content section">
          <div className="section-label">Prize Money</div>
          <h1 className="page-header__title">
            Compete for <span className="gold-text">Glory & Rewards</span>
          </h1>
          <p className="page-header__sub">
            NGPL rewards outstanding performances with real prize money. Win individually, win as a team — every great performance is recognized.
          </p>
        </div>
      </div>

      <section className="section">

        {/* Total Pool Banner */}
        <div className="prizes-pool-banner">
          <div className="prizes-pool-banner__orb" />
          <div className="prizes-pool-banner__inner">
            <Trophy size={40} className="prizes-pool-banner__icon" />
            <div>
              <div className="prizes-pool-banner__label">Total Prize Pool</div>
              <div className="prizes-pool-banner__amount">₹1,00,400+</div>
            </div>
          </div>
        </div>

        {/* Team Prizes */}
        <div className="section-label" style={{ marginTop: '3rem' }}>Team Awards</div>
        <h2 className="section-title">Team <span className="gold-text">Prizes</span></h2>
        <div className="main-prizes-grid">
          {mainPrizes.map((p, i) => (
            <div key={i} className={`main-prize-card ${p.highlight ? 'main-prize-card--winner' : 'main-prize-card--runner'}`}>
              <div className="main-prize-card__rank">{p.rank}</div>
              <div className="main-prize-card__emoji">{p.emoji}</div>
              <div className="main-prize-card__label">{p.label}</div>
              <div className="main-prize-card__amount">{p.amount}</div>
              <p className="main-prize-card__desc">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Individual Prizes */}
        <div className="section-label" style={{ marginTop: '4rem' }}>Individual Awards</div>
        <h2 className="section-title">Individual <span className="gold-text">Excellence</span></h2>
        <div className="individual-prizes-grid">
          {individualPrizes.map((p, i) => (
            <div key={i} className={`ind-prize-card ${p.highlight ? 'ind-prize-card--highlight' : ''}`}>
              <div className="ind-prize-card__emoji">{p.emoji}</div>
              <h3 className="ind-prize-card__label">{p.label}</h3>
              <div className="ind-prize-card__amount">{p.amount}</div>
              <p className="ind-prize-card__desc">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Man of the Match */}
        <div className="motm-card">
          <div className="motm-card__emoji">{trophy.emoji}</div>
          <div className="motm-card__content">
            <h3 className="motm-card__label">{trophy.label}</h3>
            <p className="motm-card__desc">{trophy.desc}</p>
          </div>
          <div className="motm-card__reward">
            <span className="motm-card__reward-label">Award</span>
            <span className="motm-card__reward-value">🏆 {trophy.reward}</span>
          </div>
        </div>

        {/* CTA */}
        <div className="prizes-cta">
          <h3 className="prizes-cta__title">Your Name Could Be in This List</h3>
          <p className="prizes-cta__sub">Register for ₹199 and compete for ₹1,00,400+ in prizes.</p>
          <Link to="/register" className="btn btn-primary btn-lg">
            Register Now — ₹199 <ArrowRight size={16} />
          </Link>
        </div>

      </section>
    </div>
  )
}
